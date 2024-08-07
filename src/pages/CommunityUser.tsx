import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Avatar, Skeleton, Text } from '@telegram-apps/telegram-ui';
import { useMiniApp } from '@tma.js/sdk-react';
import { useTonWallet } from '@tonconnect/ui-react';

import { useTriggersByChatId, useUserCommunity } from '@/api/queries';
import { Title } from '@/components/common/Title';
import { ConnectWalletWithPlaceholder } from '@/components/ConnectWalletWithPlaceholder';
import { HistorySection } from '@/components/sections/HistorySection';
import { RewardShopSection } from '@/components/sections/RewardShopSection';
import { Section } from '@/components/telegram-ui/Blocks';
import { Mode } from '@/enums/Mode';
import { NoAvatarIcon } from '@/icons/NoAvatarIcon';
import { EarnPointsSection } from '../components/sections/EarnPointsSection';
import { NotFound } from './NotFound';

export const CommunityUser: FC = () => {
  const { id: chatId } = useParams();
  const { data: userCommunity, isInitialLoading, failureCount } = useUserCommunity(chatId);
  const { data: triggers } = useTriggersByChatId(chatId);

  const wallet = useTonWallet();
  const miniApp = useMiniApp();

  // TODO: better no user community design
  if ((!userCommunity && !isInitialLoading) || failureCount) {
    return <NotFound reason="No user community" />;
  }

  let textColor;

  if (miniApp.isDark) {
    textColor = wallet || !userCommunity?.settings?.isTonConnectWallet ? 'white' : '#B3B3B3';
  } else {
    textColor = wallet || !userCommunity?.settings?.isTonConnectWallet ? 'black' : '#B3B3B3';
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Section style={{ borderRadius: '0 0 12px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            style={{ marginBottom: '20px' }}
            size={96}
            src={userCommunity?.photoLink || ''}
            fallbackIcon={<NoAvatarIcon />}
          />
          <Skeleton visible={!userCommunity}>
            <Title>{userCommunity?.communityName}</Title>
          </Skeleton>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ marginTop: '32px' }}>Earned</Text>

            <Skeleton visible={!userCommunity}>
              <Text
                weight="1"
                style={{
                  marginTop: '16px',
                  fontSize: '56px',
                  lineHeight: '66px',
                  color: textColor
                }}>
                {Number(userCommunity?.points).toFixed(2)}
              </Text>
            </Skeleton>
          </div>
          {userCommunity?.settings?.isTonConnectWallet && (
            <ConnectWalletWithPlaceholder isAuthenticated={Boolean(wallet)}>
              <Typography
                variant="body2"
                textAlign="center"
                sx={{ fontSize: '16px', width: '250px', marginBottom: '15px', fontWeight: 600 }}>
                To claim your tokens and use Rewards Shop - connect your TON wallet
              </Typography>
            </ConnectWalletWithPlaceholder>
          )}
          {/* <ConnectWalletButton wallet={wallet} /> */}
          {/* {wallet ? <AuthenticatedUserLogoWithCurrency wallet={wallet} currencyValue={0} /> : null} */}
        </div>
      </Section>

      {userCommunity && (triggers?.reaction?.isEnabled || triggers?.referral?.isEnabled) ? (
        <EarnPointsSection
          chatId={Number(chatId)}
          triggers={triggers}
          communityUser={userCommunity}
        />
      ) : null}

      <div
        style={{
          display: 'grid',
          gap: 16,
          opacity: wallet || !userCommunity?.settings?.isTonConnectWallet ? 1 : 0.3,
          pointerEvents: wallet || !userCommunity?.settings?.isTonConnectWallet ? 'unset' : 'none'
        }}>
        <RewardShopSection chatId={chatId} mode={Mode.User} />
        <HistorySection chatId={chatId} />
      </div>
    </div>
  );
};
