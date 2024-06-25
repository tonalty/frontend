import { Box } from '@mui/material';
import { useTonWallet } from '@tonconnect/ui-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CommunityUser } from '../interfaces/CommunityUser';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { ProductSlider } from '../components/ProductSlider';
import HistoryTable from '../components/HistoryTable';
import { EarnPoints } from './EarnPoints';
import { Avatar, Button, LargeTitle, Text } from '@telegram-apps/telegram-ui';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';

interface Props {
  avatarSrc: string;
}

export function RewardShop(props: Props) {
  const { id } = useParams();
  const [userCommunity, setUserCommunity] = useState<CommunityUser | null>(null);

  async function getUserCommunity() {
    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/communities/${id}`, {
      headers: { tmaInitData: window.Telegram.WebApp.initData }
    });

    setUserCommunity(result.data);
  }
  const wallet = useTonWallet();

  useEffect(() => {
    getUserCommunity();
  }, []);

  if (!userCommunity) {
    return <span>No user commmunity</span>;
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Avatar size={64} src={props.avatarSrc} />

        <LargeTitle style={{ textAlign: 'center', marginTop: '16px', margin: '0 16px' }} weight="2">
          {userCommunity?.communityName}
        </LargeTitle>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ marginTop: '32px' }}>Earned</Text>

          <Text
            weight="1"
            style={{ marginTop: '16px', fontSize: '56px', lineHeight: '66px', color: '#B3B3B3' }}>
            {Number(userCommunity?.points).toFixed(2)}
          </Text>
        </div>

        <ConnectWalletButton />

        {/* {wallet ? <AuthenticatedUserLogoWithCurrency wallet={wallet} currencyValue={0} /> : null} */}

        {/* <ConnectWalletWithPlaceholder isAuthenticated={Boolean(wallet)}>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ fontSize: '16px', width: '250px', marginBottom: '15px', fontWeight: 600 }}>
            To claim your tokens and use Rewards Shop - connect your TON wallet
          </Typography>
        </ConnectWalletWithPlaceholder> */}

        <EarnPoints communityUser={userCommunity} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            opacity: wallet ? 1 : 0.3
          }}>
          {/* <Typography variant="h2" sx={{ fontSize: '30px', fontWeight: 600 }}>
            Reward Shop
          </Typography> */}

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
