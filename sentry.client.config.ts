

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://fb70fca95c27f44bc5d8b8a50cec0f8f@o4507741950771200.ingest.de.sentry.io/4507741953589328",

  integrations: [
    Sentry.replayIntegration(),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
