import '@@/config';
import BridgeService from '@@/services/bridge';

const main = async () => {
  try {
    const xx = await BridgeService.retrieveUserItems(
      '6790fd7e74a6ebd429630d41',
    );

    console.dir(xx, { depth: undefined });
  } catch (e) {
    console.dir((e as any).response.data);
  }

  process.exit(0);
};

main();
