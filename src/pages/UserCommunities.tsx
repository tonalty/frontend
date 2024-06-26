import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { Menu } from '@/components/Menu';
import { View } from '@/enums/View';
import { CommunityUser } from '../interfaces/CommunityUser';
import { SubscribedCommunity } from '@/components/SubscribedCommunity';
import { ManagedCommunity } from '@/components/ManagedCommunity';

export function UserCommunities() {
  const [userCommunities, setUserCommunities] = useState<CommunityUser[]>([]);
  const [adminCommunities, setAdminCommunities] = useState<CommunityUser[]>([]);

  const [currentView, setCurrentView] = useState(View.SUBSCRIBED);
  const onClickView = (view: View) => {
    setCurrentView(view);
  };

  const [errors, setError] = useState<unknown[]>([]);

  const fetchData = async () => {
    try {
      const userResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/communities/user`, {
        headers: { tmaInitData: window.Telegram.WebApp.initData }
      });
      setUserCommunities(userResult.data);
    } catch (error) {
      setError([...errors, error]);
    }

    try {
      const adminResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/communities/admin`, {
        headers: { tmaInitData: window.Telegram.WebApp.initData }
      });
      setAdminCommunities(adminResult.data);
    } catch (error) {
      setError([...errors, error]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (errors.length) {
    return <Box>{JSON.stringify(errors)}</Box>;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          alignSelf: 'center'
        }}>
        <Menu
          currentView={currentView}
          subscribed={userCommunities}
          managed={adminCommunities}
          onClickView={onClickView}
        />

        {currentView === View.SUBSCRIBED ? (
          <SubscribedCommunity community={userCommunities} />
        ) : null}

        {currentView === View.MANAGED ? <ManagedCommunity community={adminCommunities} /> : null}
      </Box>
    </>
  );
}
