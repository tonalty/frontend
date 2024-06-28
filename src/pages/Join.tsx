import { Typography } from '@mui/material';
import { LaunchParams, useLaunchParams, useUtils, Utils } from '@tma.js/sdk-react';

import { useCurrentUser } from '@/api/queries';
import { LinkOwner } from '@/interfaces/LinkOwner';
import { useLocation } from 'react-router-dom';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { AvatarJoinIcon } from '@/icons/AvatarJoinIcon';
import { GroupIcon } from '@/icons/GroupIcon';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 12px;
  background: white;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

export function Join() {
  let lp: LaunchParams | undefined, utils: Utils | undefined;
  try {
    lp = useLaunchParams();
    utils = useUtils();
  } catch {
    /* ignore */
  }

  const { data: currentUser } = useCurrentUser();

  const {
    state: { linkOwner }
  } = useLocation() as { state: { linkOwner: LinkOwner } };

  // const linkOwner = {
  //   ownerId: 307294448,
  //   title: 'test_group_abc',
  //   name: 'kostyan_kostyan',
  //   telegramInviteLink: 'https://t.me/+Q6SWttBodCFmMzdi',
  //   chatId: -4212114872
  // };

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
      window.open(linkOwner.telegramInviteLink, '_blank');
    }
  };

  return (
    <>
      {/* linkOwner.telegramInviteLink {JSON.stringify(linkOwner)} */}
      <Container>
        <ContentWrapper className="wrapper-centered">
          <Title level="3">Hi {getUserName()},</Title>
          <AvatarJoinIcon />

          <Title style={{ width: '306px' }} weight="2">
            User <span style={{ color: '#007AFF' }}>{linkOwner.name}</span> would like to invite you
            to the community <span style={{ color: '#007AFF' }}>{linkOwner.title}</span>
          </Title>

          <div
            style={{
              background: '#F0F0F0',
              width: '100%',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px'
            }}>
            You will get points
          </div>
          <Button
            style={{ background: '#007AFF' }}
            size="l"
            stretched
            before={<GroupIcon />}
            onClick={handleJoin}>
            Join community
          </Button>
        </ContentWrapper>
      </Container>
    </>
  );
}
