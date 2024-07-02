import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import { EarnPointsSection } from '../components/sections/EarnPointsSection';

export const CommunityUser: FC = () => {
  const { id: chatId } = useParams();
  const location = useLocation();

  const { data: userCommunity, isInitialLoading, failureCount } = useUserCommunity(chatId);
  const { data: triggers } = useTriggersByChatId(chatId);

  const wallet = useTonWallet();
  const miniApp = useMiniApp();

  // TODO: better no user community design
  if ((!userCommunity && !isInitialLoading) || failureCount) {
    return <span> No user commmunity</span>;
  }

  let textColor;

  if (miniApp.isDark) {
    textColor = wallet ? 'white' : '#B3B3B3';
  } else {
    textColor = wallet ? 'black' : '#B3B3B3';
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Section style={{ borderRadius: '0 0 12px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            style={{ marginBottom: '20px' }}
            size={96}
            src={location.state?.avatarSrc || `https://picsum.photos/seed/${chatId}/200/300`}
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

          <ConnectWalletWithPlaceholder isAuthenticated={Boolean(wallet)}>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ fontSize: '16px', width: '250px', marginBottom: '15px', fontWeight: 600 }}>
              To claim your tokens and use Rewards Shop - connect your TON wallet
            </Typography>
          </ConnectWalletWithPlaceholder>

          {/* <ConnectWalletButton wallet={wallet} /> */}

          {/* {wallet ? <AuthenticatedUserLogoWithCurrency wallet={wallet} currencyValue={0} /> : null} */}
        </div>
      </Section>

      {userCommunity && (triggers?.reaction?.isEnabled || triggers?.referral?.isEnabled) ? (
        <EarnPointsSection triggers={triggers} communityUser={userCommunity} />
      ) : null}

      <div
        style={{
          display: 'grid',
          gap: 16,
          opacity: wallet ? 1 : 0.3,
          pointerEvents: wallet ? 'unset' : 'none'
        }}>
        <RewardShopSection chatId={chatId} mode={Mode.User} />
        <HistorySection chatId={chatId} />
      </div>
    </div>
  );
};
