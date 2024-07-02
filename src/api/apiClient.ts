import { retrieveLaunchParams } from '@tma.js/sdk';
import createClient, { Middleware } from 'openapi-fetch';

import type { paths } from './schema';

const apiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Cache-Control': 'no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0'
  }
});

const myMiddleware: Middleware = {
  async onRequest({ request }) {
    try {
      const { initDataRaw } = retrieveLaunchParams();

      request.headers.set('tmaInitData', initDataRaw!);
    } catch (error) {
      // Browser probably
    }

    return request;
  },
  async onResponse({ response }) {
    // Catch and throw if error
    if (!response.ok) {
      const json = await response.json();
      console.log({ json });
      throw new Error(json.message);
    }
    return response;
  }
};

apiClient.use(myMiddleware);

export { apiClient };
