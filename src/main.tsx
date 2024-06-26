import './index.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SDKProvider } from '@tma.js/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import App from './App';
import { AdaptiveRouter } from './components/AdaptiveRouter';

// this manifest is used temporarily for development purposes
const manifestUrl =
  'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <SDKProvider acceptCustomStyles debug>
      <QueryClientProvider client={queryClient}>
        <AdaptiveRouter>
          <App />
        </AdaptiveRouter>
      </QueryClientProvider>
    </SDKProvider>
  </TonConnectUIProvider>
);
