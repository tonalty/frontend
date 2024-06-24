import './App.css';
import { ThemeProvider } from 'styled-components';
import { useTonConnect } from './hooks/useTonConnect';
import { CHAIN } from '@tonconnect/protocol';
import '@twa-dev/sdk';
import { UserCommunities } from './pages/UserCommunities';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Confirmation } from './pages/Confirmation';
import { Triggers } from './pages/Triggers';
import { RewardShop } from './pages/RewardShop';
import { ConnectCommunity } from './pages/ConnectCommunity';
import { ConnectBot } from './pages/ConnectBot';
import { GlobalStyles } from './components/GlobalStyle';
import { darkTheme, lightTheme } from './components/Theme';
import { Join } from './pages/Join';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const { network } = useTonConnect();

  const location = useLocation();
  const navigate = useNavigate();

  // const sendTgWebAppStartParam = async () => {
  //     await axios.post<unknown, { data: string }>(`${import.meta.env.VITE_BACKEND_URL}/referrals/tgWebAppStartParam`, location.hash);
  // }

  useEffect(() => {
    if (location.search.startsWith('?tgWebAppStartParam')) {
      // sendTgWebAppStartParam()
      navigate('/join-community');
    }
  }, [location]);

  // https://habr.com/ru/articles/666278/
  const isDarkMode = window.Telegram.WebApp.colorScheme === 'dark';

  console.log('isDarkMode', isDarkMode);
  console.log(`Network: `, network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A');

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<UserCommunities />} />
          <Route path="/connectbot" element={<ConnectBot />} />
          <Route path="/connectcommunity/:id" element={<ConnectCommunity />} />
          <Route path="/community/:id" element={<RewardShop />} />
          <Route path="/triggers" element={<Triggers />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/join-community" element={<Join></Join>} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
