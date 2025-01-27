import '@@/config';
import BridgeService from '@@/services/bridge';
//import * as BridgeAccountRepository from '@@/services/mongo/repositories/BridgeAccount';
//import * as UserRepository from '@@/services/mongo/repositories/User';

const main = async () => {
  await BridgeService.syncTransactions();

  process.exit(0);
};

if (require.main === module) {
  main();
}
