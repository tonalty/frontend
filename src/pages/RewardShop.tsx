import { Box, Button, Typography } from "@mui/material";
import { useTonWallet } from "@tonconnect/ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserCommunity } from "../interfaces/UserCommunity";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { ProductSlider } from "../components/ProductSlider";
import HistoryTable from "../components/HistoryTable";
import { ConnectWalletWithPlaceholder } from "../components/TokenWithDescription";
import { AuthenticatedUserLogoWithCurrency } from "../components/AuthenticatedUserLogoWithCurrency";
import { ClaimButton } from "../components/ClaimButton";

export function RewardShop() {
    let { id } = useParams();
    const [userCommunity, setUserCommunity] = useState<UserCommunity | null>(null);

    async function getUserCommunity() {
        const result = await axios.get(`https://tonalty.localhost.direct:3000/communities/${id}`, { headers: { tmaInitData: window.Telegram.WebApp.initData } })

        setUserCommunity(result.data);
    }
    const wallet = useTonWallet();

    useEffect(() => {
        getUserCommunity();
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Typography variant="h1" fontSize="30px" sx={{ marginBottom: '30px', textAlign: 'center' }}>{userCommunity?.community.title}</Typography>
                
                <ConnectWalletWithPlaceholder isAuthenticated={Boolean(wallet)}>
                    <Typography variant="body2" textAlign="center" sx={{ fontSize: '16px', width: '250px', marginBottom: '15px', fontWeight: 600}}>
                        To claim your tokens and use Rewards Shop - connect your TON wallet
                    </Typography>
                </ConnectWalletWithPlaceholder>

                {wallet ? <AuthenticatedUserLogoWithCurrency wallet={wallet} currencyValue={0} /> : null}

                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px'}}>
                    <Typography variant="body2" sx={{ marginRight: userCommunity?.points ? '15px' : '', fontSize: '24px', fontWeight: 400}}>Points earned: {userCommunity?.points}</Typography>
                    <ClaimButton wallet={wallet} points={userCommunity?.points} ></ClaimButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', opacity: Boolean(wallet) ? 1 : 0.3 }}>
                    <Typography variant="h2" sx={{ fontSize: '30px', fontWeight: 600 }}>Reward Shop</Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)', marginBottom: '15px' }}>Spend your $TREP</Typography>

                    <Box margin={'30px'}>
                        <ProductSlider></ProductSlider>
                    </Box>

                    <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 600}}>Transaction History</Typography>
                    <Box margin={'15px'}>
                        <HistoryTable />
                    </Box>

                </Box>

                <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none'}}>
                    <Button>Back</Button>
                </Link>
            </Box>
        </>
    );
}