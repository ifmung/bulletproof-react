import { env } from '@/config/env';

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser');
    const { initializeDb } = await import('./db');
    initializeDb();

    // return worker.start();
    return worker.start({
      serviceWorker: {
        url: `${env.BASE_URL}/mockServiceWorker.js`,
      },
    });
  }
};
