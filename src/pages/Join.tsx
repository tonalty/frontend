import { Button, Paper, Typography } from '@mui/material';
import { LaunchParams, useLaunchParams, useUtils, Utils } from '@tma.js/sdk-react';

import { useCurrentUser, useStartParam } from '@/api/queries';

export function Join() {
  let lp: LaunchParams | undefined, utils: Utils | undefined;
  try {
    lp = useLaunchParams();
    utils = useUtils();
  } catch {
    /* ignore */
  }

  const { data: currentUser } = useCurrentUser();
  const { data: linkOwner } = useStartParam(lp?.startParam);

  if (!currentUser || !linkOwner) {
    return <Typography>No data about current user or link owner</Typography>;
  }

  const getUserName = () => {
    return String(
      currentUser.username || currentUser.first_name || currentUser.last_name || currentUser.id
    );
  };

  const handleJoin = async () => {
    if (utils) {
      utils.openTelegramLink(linkOwner.telegramInviteLink);
    } else {
      window.open(linkOwner.telegramInviteLink, "_blank");
    }
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
