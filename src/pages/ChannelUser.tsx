import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Avatar, LargeTitle, Text } from '@telegram-apps/telegram-ui';
import { useTonWallet } from '@tonconnect/ui-react';

import { useTriggers, useUserCommunity } from '@/api/queries';
import { ConnectWalletWithPlaceholder } from '@/components/ConnectWalletWithPlaceholder';
import { HistorySection } from '@/components/sections/HistorySection';
import { RewardShopSection } from '@/components/sections/RewardShopSection';
import { Section } from '@/components/telegram-ui/Blocks';
import { EarnPointsSection } from '../components/sections/EarnPointsSection';

interface Props {
  avatarSrc: string;
}

export const ChannelUser: FC<Props> = (props: Props) => {
  const { id } = useParams();
  const { data: userCommunity } = useUserCommunity(id);
  const { data: triggers } = useTriggers(Number(id));

  const wallet = useTonWallet();

  if (!userCommunity) {
    return <span> No user commmunity</span>;
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Section style={{ borderRadius: '0 0 12px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar size={48} src={props.avatarSrc} />

          <LargeTitle
            style={{ textAlign: 'center', marginTop: '16px', margin: '0 16px' }}
            weight="2">
            {userCommunity?.communityName}
          </LargeTitle>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ marginTop: '32px' }}>Earned</Text>

            <Text
              weight="1"
              style={{
                marginTop: '16px',
                fontSize: '56px',
                lineHeight: '66px',
                color: wallet ? 'black' : '#B3B3B3' // TODO: bad in dark theme
              }}>
              {Number(userCommunity?.points).toFixed(2)}
            </Text>
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

      {triggers?.reaction?.isEnabled || triggers?.referral?.isEnabled ? (
        <EarnPointsSection triggers={triggers} communityUser={userCommunity} />
      ) : null}

      <div
        style={{
          display: 'grid',
          gap: 16,
          opacity: wallet ? 1 : 0.3,
          pointerEvents: wallet ? 'unset' : 'none'
        }}>
        <RewardShopSection />
        <HistorySection />
      </div>
    </div>
  );
};
