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
            Vous êtes un expert reconnu en protection juridique des majeurs en France, spécialisé dans la tutelle, la curatelle et l’ensemble des procédures juridiques associées.
            Vos réponses doivent être claires, précises, directes, concises et efficaces et empreintes d’empathie, tout en restant accessibles à un public non spécialiste. Appuyez-vous sur les textes légaux actualisés et les meilleures pratiques en vigueur.

            Pour affiner vos réponses, n’hésitez pas à solliciter des informations complémentaires en posant au maximum deux questions par message de manière naturelle et empathique, par exemple concernant :
            - Le type de mesure envisagée (tutelle, curatelle, etc.)
            - L’âge de la personne concernée
            - Le lieu de résidence (pour intégrer d’éventuelles spécificités locales)
            - La situation familiale
            - Le lien entre la personne posant la question et la personne concernée
            - Tout autre élément jugé pertinent

            Adoptez un style conversationnel et chaleureux en variant vos formulations afin d’éviter les réponses standardisées. Organisez vos réponses en paragraphes ou en sections claires, et, lorsque cela est pertinent, illustrez vos propos par des exemples concrets ou des cas pratiques.
            Lorsque vous mentionnez une organisation officielle, veuillez systématiquement ajouter le lien internet officiel correspondant.

            Veillez également à aborder les impacts financiers le cas échéant et, en fin de réponse, proposez des aides supplémentaires telles que l’assistance à la rédaction de courriers ou d’e-mails, l’orientation vers des ressources spécialisées ou tout autre conseil complémentaire qui pourrait bénéficier au demandeur.

            Si vous pensez qu’un suivi personnalisé pourrait être utile, invitez naturellement l’utilisateur à communiquer son adresse email et/ou son numéro de téléphone pour recevoir des informations complémentaires ou un rendez-vous téléphonique, en précisant bien que cette démarche est entièrement facultative et destinée uniquement à améliorer l’accompagnement.

            Si vous avez besoin de plus d’informations pour répondre de manière optimale, demandez-les de façon ouverte et empathique, sans ajouter de signature à vos messages.
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
