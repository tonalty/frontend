import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { CommunityUser } from '../interfaces/CommunityUser';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu } from '../components/Menu';

export function UserCommunities() {
  const [userCommunities, setUserCommunities] = useState<CommunityUser[]>([]);

  const [adminCommunities, setAdminCommunities] = useState<CommunityUser[]>([]);

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            alignSelf: 'center'
          }}>
          <Typography variant="h1" fontSize="30px" textAlign="center">
            Communities
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            marginY={2}
            sx={{ fontSize: '16px', width: '300px', marginBottom: '15px' }}>
            Here is the list of your telegram channels with points you can get
          </Typography>
        </Box>
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
        <Typography variant="h1" fontSize="30px" textAlign="center">
          Communities
        </Typography>

        <Menu />

        <Typography variant="body2" textAlign="center" marginTop={2} sx={{ fontSize: '16px' }}>
          Your communities
        </Typography>

        <List sx={{ width: '100%', maxWidth: 360 }}>
          {userCommunities.map((community, index) => {
            return (
              <Link
                to={`/community/${community.chatId}`}
                key={index}
                style={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItem className="gbLi" sx={{ marginTop: '10px', borderRadius: '10px' }}>
                  <ListItemIcon>
                    <GroupsIcon htmlColor="#0098EA" />
                  </ListItemIcon>
                  <ListItemText
                    primary={community?.communityName}
                    secondary={`Earned points: ${community.points}`}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>

        <Typography variant="body2" textAlign="center" marginTop={2} sx={{ fontSize: '16px' }}>
          Manage
        </Typography>

        <List sx={{ width: '100%', maxWidth: 360 }}>
          {adminCommunities.map((community, index) => {
            return (
              <Link
                to={`/connectcommunity/${community?.chatId}`}
                key={index}
                style={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItem className="gbLi" sx={{ marginTop: '10px', borderRadius: '10px' }}>
                  <ListItemIcon>
                    <GroupsIcon htmlColor="#0098EA" />
                  </ListItemIcon>
                  <ListItemText primary={community.communityName} />
                </ListItem>
              </Link>
            );
          })}
        </List>

        <Link
          to={`/connectbot`}
          style={{ marginTop: '15px', color: 'inherit', textDecoration: 'none' }}>
          <Button>How to connect community</Button>
        </Link>
      </Box>
    </>
  );
}
