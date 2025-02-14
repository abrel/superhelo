import '@@/config';
// import BridgeService from '@@/services/bridge';
// import { extractIntelsFromDocumentsForUser } from '@@/services/gpt/openai/document';

const main = async () => {
  // await BridgeService.syncTransactions();
  // await extractIntelsFromDocumentsForUser('67483607f37ff9e91fc70390');

  process.exit(0);
};

if (require.main === module) {
  main();
}
