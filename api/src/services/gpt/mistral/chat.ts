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
  MemorySaver,
} from '@langchain/langgraph';

const trimmer = trimMessages({
  maxTokens: 20,
  strategy: 'last',
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
});

export const runGuardianChatbot = async ({
  question,
  threadId,
}: {
  question: string;
  threadId: string;
}) => {
  const llm = new ChatMistralAI({
    model: 'mistral-large-latest',
    temperature: 0.3,
  });

  // Define the function that calls the model
  const callModel = async (state: typeof MessagesAnnotation.State) => {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(
        `Vous êtes un expert en tutelle et en protection juridique en France.
          Vous possédez une connaissance approfondie de la tutelle, de la curatelle et des procédures juridiques associées, ainsi que des conseils pratiques pour les tuteurs et leurs protégés.
          Veuillez fournir des réponses claires, professionnelles, empathiques et concises en français.
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

  // Define a new graph
  const workflow = new StateGraph(MessagesAnnotation)
    .addNode('model', callModel)
    .addEdge(START, 'model')
    .addEdge('model', END);

  // Add memory
  const app = workflow.compile({ checkpointer: new MemorySaver() });

  const config = { configurable: { thread_id: threadId } };
  const output = await app.invoke(
    { messages: [new HumanMessage(question)] },
    config,
  );

  return output;
};
