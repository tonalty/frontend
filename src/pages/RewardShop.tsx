import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { Link, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Avatar, Button, LargeTitle, Text } from '@telegram-apps/telegram-ui';
import { useTonWallet } from '@tonconnect/ui-react';

import { useUserCommunity } from '@/api/queries';
import { ConnectWalletWithPlaceholder } from '@/components/ConnectWalletWithPlaceholder';
import HistoryTable from '../components/HistoryTable';
import { ProductSlider } from '../components/ProductSlider';
import { EarnPoints } from './EarnPoints';

interface Props {
  avatarSrc: string;
}

export function RewardShop(props: Props) {
  const { id } = useParams();
  const { data: userCommunity } = useUserCommunity(id);

  const wallet = useTonWallet();

  if (!userCommunity) {
    return <span>No user commmunity</span>;
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Avatar size={48} src={props.avatarSrc} />

        <LargeTitle style={{ textAlign: 'center', marginTop: '16px', margin: '0 16px' }} weight="2">
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
              color: wallet ? 'black' : '#B3B3B3'
            }}>
            {Number(userCommunity?.points).toFixed(2)}
          </Text>
        </div>

        {/* <ConnectWalletButton wallet={wallet} /> */}

        <ConnectWalletWithPlaceholder isAuthenticated={Boolean(wallet)}>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ fontSize: '16px', width: '250px', marginBottom: '15px', fontWeight: 600 }}>
            To claim your tokens and use Rewards Shop - connect your TON wallet
          </Typography>
        </ConnectWalletWithPlaceholder>

        {/* {wallet ? <AuthenticatedUserLogoWithCurrency wallet={wallet} currencyValue={0} /> : null} */}

        <EarnPoints communityUser={userCommunity} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            opacity: wallet ? 1 : 0.3
          }}>
          <ProductSlider></ProductSlider>
          <HistoryTable />
        </Box>
        <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button>Back</Button>
        </Link>
      </div>
    </>
  );
}
