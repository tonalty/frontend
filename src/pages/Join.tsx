import { Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LinkOwner } from '../interfaces/LinkOwner';
import { User } from 'node-telegram-bot-api';

export function Join() {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [linkOwner, setLinkOwner] = useState<null | LinkOwner>(null);

  const fetchCurrentUser = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/referrals/currentUser`, {
      headers: { tmaInitData: window.Telegram.WebApp.initData }
    });

    setCurrentUser(response.data);
  };

  const fetchLinkOwner = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/referrals/startParam`, {
      // userData
      headers: { startParam: window.Telegram.WebApp.initDataUnsafe?.start_param }
    });

    setLinkOwner(response.data);
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchLinkOwner();
  }, []);

  if (!currentUser || !linkOwner) {
    return <Typography>No data about current user or link owner</Typography>;
  }

  const getUserName = () => {
    return String(
      currentUser.username || currentUser.first_name || currentUser.last_name || currentUser.id
    );
  };

  const handleJoin = async () => {
    window.Telegram.WebApp.openTelegramLink(linkOwner.telegramInviteLink);
  };

  return (
    <>
      linkOwner.telegramInviteLink {JSON.stringify(linkOwner.telegramInviteLink)}
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
        <Typography textAlign={'center'}>Hello {getUserName()}!</Typography>
        <Typography textAlign={'center'}>
          User {linkOwner.name} would like to invite you to the community "{linkOwner.title}".
        </Typography>
        <Button fullWidth onClick={handleJoin}>
          Join the community
        </Button>
      </Paper>
    </>
  );
}
