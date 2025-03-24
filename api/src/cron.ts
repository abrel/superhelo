/* eslint-disable no-console */
import '@@/config';
import '@@/instrument';
import cron from 'node-cron';
import * as Sentry from '@sentry/node';
import BridgeService from '@@/services/bridge';

const tz = 'Europe/Paris';

// Sync Bridge Data every day at 2am
cron.schedule(
  '0 2 * * *',
  async () => {
    try {
      await BridgeService.syncBridgeData();
      console.log('Task : syncBridgeData : OK');
    } catch (e) {
      Sentry.captureException(e);
    }
  },
  { timezone: tz },
);
