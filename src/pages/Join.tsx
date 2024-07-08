import { FC } from 'react';
import { Typography } from '@mui/material';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { MiniApp, useMiniApp, useUtils, Utils } from '@tma.js/sdk-react';
import styled from 'styled-components';

import { useReferralJoin } from '@/api/mutations';
import { useCurrentUser } from '@/api/queries';
import { AvatarJoinIcon } from '@/icons/AvatarJoinIcon';
import { GroupIcon } from '@/icons/GroupIcon';
import { LinkOwner } from '@/interfaces/LinkOwner';

export const Container = styled.div`
  padding: 12px;
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

export const Join: FC<{ linkOwner: LinkOwner }> = ({ linkOwner }) => {
  let miniApp: MiniApp | undefined, utils: Utils | undefined;
  try {
    miniApp = useMiniApp();
    utils = useUtils();
  } catch {
    /* ignore */
  }

  const { data: currentUser, isLoading } = useCurrentUser();
  const { mutateAsync: joinReferral } = useReferralJoin();

  const handleJoin = async () => {
    try {
      await joinReferral({
        chatId: Number(linkOwner.chatId),
        ownerId: linkOwner.ownerId,
        title: linkOwner.title
      });
    } catch (error) {
      console.error(error);
    }

    if (utils) {
      try {
        console.log('utils', linkOwner.telegramInviteLink);
        utils.openTelegramLink(linkOwner.telegramInviteLink);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log('windows', linkOwner.telegramInviteLink);
        window.open(linkOwner.telegramInviteLink, '_blank');
      } catch (error) {
        console.log(error);
      }
    }
    // try to close it manual if something goes wrong
    // miniApp?.close();
  };

  // const linkOwner = {
  //   ownerId: 307294448,
  //   title: 'test_group_abc',
  //   name: 'kostyan_kostyan',
  //   telegramInviteLink: 'https://t.me/+Q6SWttBodCFmMzdi',
  //   chatId: -4212114872
  // };

  if (isLoading) {
    return null;
  }

  if (!currentUser || !linkOwner) {
    return <Typography>No data about current user or link owner</Typography>;
  }

  const getUserName = () => {
    return String(
      currentUser.username || currentUser.first_name || currentUser.last_name || currentUser.id
    );
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
              borderRadius: '10px',
              color: 'black',
              marginTop: '36px'
            }}>
            You will get points {/* TODO: how much? */}
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
};
