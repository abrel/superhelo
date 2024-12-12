import '@@/config';
import BridgeService from '@@/services/bridge';

const main = async () => {
  await BridgeService.initiateTransfer();
};

main();
