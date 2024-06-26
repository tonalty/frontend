import '@twa-dev/sdk';

import { useEffect } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { bindViewportCSSVars, MiniApp, useMiniApp, useViewport, Viewport } from '@tma.js/sdk-react';
import { CHAIN } from '@tonconnect/ui-react';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { GlobalStyles } from './components/GlobalStyle';
import { darkTheme, lightTheme } from './components/Theme';
import { useTonConnect } from './hooks/useTonConnect';

export function Root() {
  let viewport: Viewport | undefined, miniApp: MiniApp | undefined;
  try {
    viewport = useViewport();
    miniApp = useMiniApp();
  } catch {
    /* ignore */
  }
  const { network } = useTonConnect();

  useEffect(() => {
    viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  console.log('isDarkMode', miniApp?.isDark);
  console.log(`Network: `, network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A');

  return (
    <AppRoot appearance={miniApp?.isDark ? 'dark' : 'light'} platform="ios">
      <ThemeProvider theme={miniApp?.isDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </AppRoot>
  );
}
