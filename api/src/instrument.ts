import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://825f41d83023e951cdc4f25606154ef1@o4508290784952320.ingest.de.sentry.io/4508290786984016',
  environment: process.env.ENV,
  release: process.env.SHA1 || 'local',
  integrations: [nodeProfilingIntegration()],
  sampleRate: process.env.ENV === 'local' ? 0 : 1,
  tracesSampleRate: 0,
});
