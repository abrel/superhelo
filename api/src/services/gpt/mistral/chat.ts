import Promise from 'bluebird';
import { ChatMistralAI } from '@langchain/mistralai';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import {
  BaseMessage,
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
import { getFileContent } from '@@/utils/document';

const MAX_TOKENS = 150000;

const tokenCounter = (msg: BaseMessage): number => {
  let text: string;
  if (typeof msg.content === 'string') {
    text = msg.content;
  } else if (Array.isArray(msg.content)) {
    text = msg.content
      .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
      .join(' ');
  } else {
    text = JSON.stringify(msg.content);
  }

  return text.length / 4;
};

const filterOldLargeMessages = (
  msgs: BaseMessage[],
  preserveCount: number = 5,
): BaseMessage[] => {
  return msgs.filter((msg, idx) => {
    if (idx >= msgs.length - preserveCount) {
      return true;
    }

    return tokenCounter(msg) < MAX_TOKENS / 5;
  });
};

const customTokenCounter = (msgs: BaseMessage[]): number => {
  let totalTokens = 0;

  for (const msg of msgs) {
    totalTokens += tokenCounter(msg);
  }

  return totalTokens;
};

const trimmer = trimMessages({
  maxTokens: MAX_TOKENS,
  strategy: 'last',
  tokenCounter: customTokenCounter,
  includeSystem: true,
  allowPartial: true,
});

class GuardianChatBot {
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

export default new GuardianChatBot();
