import { ChatMistralAI } from '@langchain/mistralai';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import {
  HumanMessage,
  SystemMessage,
  trimMessages,
} from '@langchain/core/messages';
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
} from '@langchain/langgraph';
import { MongoDBSaver } from '@langchain/langgraph-checkpoint-mongodb';
import MongoManager from '@@/services/mongo';

const trimmer = trimMessages({
  maxTokens: 50,
  strategy: 'last',
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
});

class GuardianChatBot {
  app: any;

  constructor() {
    const llm = new ChatMistralAI({
      model: 'mistral-large-latest',
      temperature: 0.3,
    });

    const callModel = async (state: typeof MessagesAnnotation.State) => {
      const promptTemplate = ChatPromptTemplate.fromMessages([
        new SystemMessage(
          `
          Vous êtes un expert en tutelle et en protection juridique en France.
          Vous possédez une connaissance approfondie de la tutelle, de la curatelle et des procédures juridiques associées, ainsi que des conseils pratiques pour les tuteurs et leurs protégés.
          Veuillez fournir des réponses claires, professionnelles, empathiques et concises en français.
          Si vous pensez que cela s'avère utile pour faire une meilleure réponse, vous demanderez les informations nécessaires ; par exemple :
            - le type de mesure
            - l'âge de la personne concernée
            - le lieu de résidence de la personne concernée
            - la situation familiale de la personne concernée
            - le statut de la personne posant la question vis à vis de la personne concernée
            - ...

          Vous n'oublierez pas d'évolquer les impacts financiers lorsque cela s'avère pertinent.
          Vous n'hésiterez pas à proposer, en fin de réponse, de l'aide supplémentaire, des ressources ou des conseils en rapport avec la question posée si cela est pertinent.
          Vous ne signerez pas vos messages.
          `,
        ),
        new MessagesPlaceholder('messages'),
      ]);

      const prompt = await promptTemplate.invoke({
        messages: await trimmer.invoke(state.messages),
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
  }: {
    question: string;
    threadId: string;
  }) => {
    const config = { configurable: { thread_id: threadId } };
    const output = await this.app.invoke(
      { messages: [new HumanMessage(question)] },
      config,
    );

    return output;
  };
}

export default new GuardianChatBot();
