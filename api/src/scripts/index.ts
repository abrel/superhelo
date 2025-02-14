import '@@/config';
// import BridgeService from '@@/services/bridge';
// import { extractIntelsFromDocumentsForUser } from '@@/services/gpt/openai/document';
import { runGuardianChatbot } from '@@/services/gpt/mistral/chat';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

const main = async () => {
  // await BridgeService.syncTransactions();
  // await extractIntelsFromDocumentsForUser('67483607f37ff9e91fc70390');
  const x1 = await runGuardianChatbot({
    question: `Je suis Alice et j'hésite à devenir tutrice légale de ma mère. Quels sont les avantages et les inconvénients de la tutelle légale en France?`,
    threadId: '1234',
  });

  for (const message of x1.messages) {
    console.log(message);
    if (message instanceof HumanMessage) {
      console.log('HumanMessage');
    }

    if (message instanceof AIMessage) {
      console.log('AIMessage');
    }
  }

  process.exit(0);
};

if (require.main === module) {
  main();
}
