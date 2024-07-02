import './index.css';
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SDKProvider } from '@tma.js/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import { AdaptiveRouter } from './components/AdaptiveRouter';
import { Root } from './Root';

// this manifest is used temporarily for development purposes
const manifestUrl =
  'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: () => {
        // According to Telegram policy, better to not have any cache
        queryClient.invalidateQueries({
          refetchType: 'all' // invalidate all queries on mutation success
        });
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider
    manifestUrl={manifestUrl}
    uiPreferences={{
      borderRadius: 's'
    }}>
    <SDKProvider acceptCustomStyles debug>
      <QueryClientProvider client={queryClient}>
        <AdaptiveRouter>
          <Root />
        </AdaptiveRouter>
      </QueryClientProvider>
    </SDKProvider>
  </TonConnectUIProvider>
);
