import './App.css';

import { Route, Routes } from 'react-router-dom';
import { LaunchParams, useLaunchParams } from '@tma.js/sdk-react';

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

  if (lp?.startParam) {
    return (
      <Routes>
        <Route path="*" element={<Join />} />
      </Routes>
    );
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
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/" element={<UserCommunities />} />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
}

export default App;
