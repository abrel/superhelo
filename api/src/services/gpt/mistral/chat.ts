import Promise from 'bluebird';
import { ChatMistralAI } from '@langchain/mistralai';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
} from '@langchain/langgraph';
import { MongoDBSaver } from '@langchain/langgraph-checkpoint-mongodb';
import MongoManager from '@@/services/mongo';
import { trimmer, filterOldLargeMessages } from '@@/utils/gpt';
import { getFileContent } from '@@/utils/document';

class MistralGuardianChatBot {
  app: any;

  constructor() {
    const llm = new ChatMistralAI({
      model: 'pixtral-large-latest',
      temperature: 0.3,
    });

    const callModel = async (state: typeof MessagesAnnotation.State) => {
      const promptTemplate = ChatPromptTemplate.fromMessages([
        new SystemMessage(
          `
          Vous êtes un expert reconnu en protection juridique en France. Votre expertise couvre notamment la tutelle, la curatelle et l'ensemble des procédures juridiques associées, ainsi que les conseils pratiques destinés aux tuteurs et à leurs protégés.
          Fournissez des réponses claires, précises, concises et empathiques en français, en tenant compte de la situation personnelle du demandeur dès que cela est pertinent. Pour affiner vos réponses, n’hésitez pas à solliciter les informations complémentaires nécessaires, telles que :
          - Le type de mesure envisagée (tutelle, curatelle, etc.)
          - L’âge de la personne concernée
          - Le lieu de résidence (pour prendre en compte d’éventuelles spécificités locales)
          - La situation familiale
          - Le lien entre la personne posant la question et la personne concernée
          - Tout autre élément pertinent à votre jugement

          Veillez également à aborder les impacts financiers lorsque cela s’avère nécessaire.
          En fin de réponse, proposez des aides supplémentaires (par exemple : assistance à la rédaction de courriers ou d’e-mails, orientation vers des ressources spécialisées, ou conseils complémentaires) si cela peut bénéficier au demandeur.
          Vos réponses doivent s’appuyer sur les textes légaux et les meilleures pratiques en vigueur.
          N’ajoutez pas de signature à vos messages. Si vous avez besoin de plus d’informations pour répondre à une question, demandez-les de manière naturelle et empathique.
          `,
        ),
        new MessagesPlaceholder('messages'),
      ]);

      const trimmedMessages = await trimmer.invoke(
        filterOldLargeMessages(state.messages),
      );

      const prompt = await promptTemplate.invoke({
        messages: trimmedMessages,
      });

      const response = await llm.invoke(prompt);

      return { messages: [response] };
    };

    const workflow = new StateGraph(MessagesAnnotation)
      .addNode('model', callModel)
      .addEdge(START, 'model')
      .addEdge('model', END);

    const checkpointSaver = new MongoDBSaver({
      client: MongoManager.getClient(),
      dbName: 'sh',
      checkpointCollectionName: 'checkpoints',
      checkpointWritesCollectionName: 'checkpoint_writes',
    });

    this.app = workflow.compile({ checkpointer: checkpointSaver });
  }

  askQuestion = async ({
    question,
    threadId,
    files,
  }: {
    question: string;
    threadId: string;
    files?: Express.Multer.File[];
  }) => {
    const config = { configurable: { thread_id: threadId } };
    const messages: (HumanMessage | SystemMessage)[] = [];

    if (files) {
      const preparedDocuments = await Promise.map(files, getFileContent, {
        concurrency: 5,
      });

      for (const documents of preparedDocuments) {
        for (const document of documents) {
          const content = [];

          if (document.data) {
            content.push({
              type: 'text',
              text: `Title: ${document.title}\n\nContent:\n${document.data}`,
            });
          }

          if (document.b64Images) {
            for (const b64Image of document.b64Images) {
              content.push({
                type: 'image_url',
                image_url: {
                  url: b64Image,
                },
              });
            }
          }

          messages.push(new HumanMessage({ content }));
        }
      }
    }

    messages.push(new HumanMessage(question));
    const output = await this.app.invoke({ messages }, config);

    return output;
  };
}

export default new MistralGuardianChatBot();
