import './App.css';

import { useEffect, useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Spinner } from '@telegram-apps/telegram-ui';
import { LaunchParams, useLaunchParams } from '@tma.js/sdk-react';

import { useStartParam } from './api/queries';
import { CommunityManage } from './pages/CommunityManage';
import { CommunityUser } from './pages/CommunityUser';
import { Confirmation } from './pages/Confirmation';
import { ConnectBot } from './pages/ConnectBot';
import { ConnectCommunity } from './pages/ConnectCommunity';
import { Join } from './pages/Join';
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
      if ('chatId' in payload) {
        navigate(`/community/${payload.chatId}`);
      }
    }
  }, [lp?.startParam, payload]);

  if (lp?.startParam && isLoading) {
    // return (
    //   <div
    //     style={{
    //       position: 'absolute',
    //       top: '50%',
    //       left: '50%',
    //       transform: 'translate(-50%, -50%)'
    //     }}>
    //     <Spinner size={'l'} />
    //   </div>
    // );
    // Looks better without spinner
    return null;
  }

  if (isError) {
    console.log('error', error);
    return <span>Error: {JSON.stringify(error)}</span>;
  }

  if (payload && 'ownerId' in payload) {
    return <Join linkOwner={payload} />;
  }

  return (
    <Routes>
      <Route path="/connectbot" element={<ConnectBot />} />
      <Route path="/connectcommunity/:id" element={<ConnectCommunity />} />
      <Route path="/community/:id" element={<CommunityUser />} />
      <Route path="/manage/:id" element={<CommunityManage />} />
      <Route path="/triggers" element={<Triggers />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/" element={<UserCommunities />} />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
}

export default App;
