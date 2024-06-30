import './App.css';

import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Spinner } from '@telegram-apps/telegram-ui';
import { LaunchParams, useLaunchParams } from '@tma.js/sdk-react';

import { useStartParam } from './api/queries';
import { ChannelUser } from './pages/ChannelUser';
import { Confirmation } from './pages/Confirmation';
import { ConnectBot } from './pages/ConnectBot';
import { ConnectCommunity } from './pages/ConnectCommunity';
import { Join } from './pages/Join';
import { Manage } from './pages/Manage';
import { Triggers } from './pages/Triggers';
import { UserCommunities } from './pages/UserCommunities';

function App() {
  let lp: LaunchParams | undefined;
  try {
    lp = useLaunchParams();
  } catch {
    /* ignore */
  }

  // const sendTgWebAppStartParam = async () => {
  //     await axios.post<unknown, { data: string }>(`${import.meta.env.VITE_BACKEND_URL}/referrals/tgWebAppStartParam`, location.hash);
  // }

  const { data: payload, isLoading, isError, error } = useStartParam(lp?.startParam);
  const navigate = useNavigate();

  useEffect(() => {
    if (lp?.startParam && payload) {
      if ('ownerId' in payload) {
        return navigate('/join', { state: { linkOwner: payload } });
      } else if ('chatId' in payload) {
        return navigate(`/community/${payload.chatId}`);
      }
    }
  }, [lp?.startParam, payload]);

  if (lp?.startParam && isLoading) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        <Spinner size={'l'} />
      </div>
    );
  }

  if (isError) {
    console.log('error', error);
    return <span>Error: {JSON.stringify(error)}</span>;
  }

  return (
    <Routes>
      <Route path="/connectbot" element={<ConnectBot />} />
      <Route path="/connectcommunity/:id" element={<ConnectCommunity />} />
      <Route
        path="/community/:id"
        element={<ChannelUser avatarSrc="https://picsum.photos/200/300" />}
      />
      <Route path="/manage/:id" element={<Manage />} />
      <Route path="/triggers" element={<Triggers />} />
      <Route path="/join" element={<Join />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/" element={<UserCommunities />} />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
}

export default App;
