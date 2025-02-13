/* eslint-disable no-console */
import '@@/config';
import '@@/instrument';
import cron from 'node-cron';
import BridgeService from '@@/services/bridge';

const tz = 'Europe/Paris';

// Sync transactions every day at 2am
cron.schedule(
  '0 2 * * *',
  async () => {
    try {
      await BridgeService.syncTransactions();
      console.log('Sync Transactions : OK');
    } catch (e) {
      console.error(e);
    }
  },
  { timezone: tz },
);
