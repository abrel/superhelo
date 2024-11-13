/* eslint-disable no-console */
import '@@/config';
import '@@/instrument';
import cron from 'node-cron';

const tz = 'Europe/Paris';

// Compute dummy task every day at 2am
cron.schedule(
  '0 2 * * *',
  async () => {
    try {
      console.log('Dummy Task : OK');
    } catch (e) {
      console.error(e);
    }
  },
  { timezone: tz },
);
