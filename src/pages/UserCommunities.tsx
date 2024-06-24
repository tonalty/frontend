import { Avatar, Box } from '@mui/material';

import { Link } from 'react-router-dom';
import { CommunityUser } from '../interfaces/CommunityUser';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu } from '../components/Menu';
import { Cell, Section } from '@telegram-apps/telegram-ui';
import { View } from '@/enums/View';

const CellStyles = {
  height: '68px',
  marginTop: '32px',
  background: 'inherit',
  borderRadius: '30px'
};

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

  if (userCommunities.length === 0 && adminCommunities.length === 0) {
    return (
      <>
        <Menu
          currentView={currentView}
          subscribed={userCommunities}
          managed={adminCommunities}
          onClickView={onClickView}
        />
      </>
    );
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
          <Section style={{ width: '100%' }}>
            {userCommunities.map((community, index) => {
              return (
                <Link
                  className="disableHover"
                  to={`/community/${community.chatId}`}
                  key={index}
                  style={{ color: 'inherit', textDecoration: 'none', background: 'inherit' }}>
                  <Cell
                    style={CellStyles}
                    subtitle={`Earned points: ${community.points}`}
                    before={<Avatar src="https://avatars.githubusercontent.com/u/84640980?v=4" />}>
                    {community?.communityName}
                  </Cell>
                </Link>
              );
            })}
          </Section>
        ) : null}

        {currentView === View.MANAGED ? (
          <Section style={{ width: '100%' }}>
            {adminCommunities.map((community, index) => {
              return (
                <Link
                  className="disableHover"
                  to={`/community/${community.chatId}`}
                  key={index}
                  style={{ color: 'inherit', textDecoration: 'none', background: 'inherit' }}>
                  <Cell
                    style={CellStyles}
                    subtitle={`Earned points: ${community.points}`}
                    before={
                      <Avatar src="https://cdn.theatlantic.com/thumbor/tO5tLGl38cH3MjWz3PypY1dPHX4=/0x62:2000x1187/960x540/media/img/mt/2018/03/AP_325360162607/original.jpg" />
                    }>
                    {community?.communityName}
                  </Cell>
                </Link>
              );
            })}
          </Section>
        ) : null}
      </Box>
    </>
  );
}
