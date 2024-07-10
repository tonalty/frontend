import './App.css';

import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LaunchParams, useLaunchParams } from '@tma.js/sdk-react';

import { useStartParam } from './api/queries';
import { CommunityManage } from './pages/CommunityManage';
import { CommunityUser } from './pages/CommunityUser';
import { Confirmation } from './pages/Confirmation';
import { ConnectBot } from './pages/ConnectBot';
import { ConnectCommunity } from './pages/ConnectCommunity';
import { Join } from './pages/Join';
import { NotFound } from './pages/NotFound';
import { Triggers } from './pages/Triggers';
import { UserCommunities } from './pages/UserCommunities';

function App() {
  let lp: LaunchParams | undefined;
  try {
    lp = useLaunchParams();
  } catch {
    /* ignore */
  }

  const { data: payload, isLoading, isError, error } = useStartParam(lp?.startParam);
  const navigate = useNavigate();

  useEffect(() => {
    if (lp?.startParam && payload) {
      if ('chatId' in payload && !('telegramInviteLink' in payload)) {
        console.log('navigating to community...');
        navigate(`/community/${payload.chatId}`);
      }
    }
  }, [lp?.startParam, payload]);

  if (lp?.startParam && isLoading) {
    return null;
  }

  if (isError) {
    console.log('error', error);
    return <NotFound reason={JSON.stringify(error)} />;
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
