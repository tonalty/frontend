import './App.css';
import '@twa-dev/sdk';

import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoot } from '@telegram-apps/telegram-ui';
import {
  bindViewportCSSVars,
  LaunchParams,
  MiniApp,
  useLaunchParams,
  useMiniApp,
  useViewport,
  Viewport
} from '@tma.js/sdk-react';
import { CHAIN } from '@tonconnect/protocol';
import { ThemeProvider } from 'styled-components';

import { AdaptiveRouter } from './components/AdaptiveRouter';
import { GlobalStyles } from './components/GlobalStyle';
import { darkTheme, lightTheme } from './components/Theme';
import { useTonConnect } from './hooks/useTonConnect';
import { Confirmation } from './pages/Confirmation';
import { ConnectBot } from './pages/ConnectBot';
import { ConnectCommunity } from './pages/ConnectCommunity';
import { Join } from './pages/Join';
import { RewardShop } from './pages/RewardShop';
import { Triggers } from './pages/Triggers';
import { UserCommunities } from './pages/UserCommunities';

function App() {
  let miniApp: MiniApp | undefined, viewport: Viewport | undefined, lp: LaunchParams | undefined;
  try {
    miniApp = useMiniApp();
    viewport = useViewport();
    lp = useLaunchParams();
  } catch {
    /* ignore */
  }
  const { network } = useTonConnect();

  // const sendTgWebAppStartParam = async () => {
  //     await axios.post<unknown, { data: string }>(`${import.meta.env.VITE_BACKEND_URL}/referrals/tgWebAppStartParam`, location.hash);
  // }

  useEffect(() => {
    viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // useEffect(() => {
  //   if (lp?.startParam) {
  //     // sendTgWebAppStartParam()
  //     navigate('/join-community')
  //   }
  // }, [lp])

  console.log('isDarkMode', miniApp?.isDark);
  console.log(`Network: `, network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A');

  return (
    <AppRoot
      appearance={miniApp?.isDark ? 'dark' : 'light'}
      platform={lp && (['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base')}>
      <ThemeProvider theme={miniApp?.isDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <AdaptiveRouter>
          <Routes>
            <Route path="/connectbot" element={<ConnectBot />} />
            <Route path="/connectcommunity/:id" element={<ConnectCommunity />} />
            <Route
              path="/community/:id"
              element={<RewardShop avatarSrc="https://picsum.photos/200/300" />}
            />
            <Route path="/triggers" element={<Triggers />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/join-community" element={<Join />} />
            <Route path="/" element={<UserCommunities />} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </AdaptiveRouter>
      </ThemeProvider>
    </AppRoot>
  );
}

export default App;
