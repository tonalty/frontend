import { Avatar, Box, Typography } from '@mui/material';
import { Wallet, WalletInfoWithOpenMethod } from '@tonconnect/ui-react';

interface Props {
  wallet: Wallet | (Wallet & WalletInfoWithOpenMethod) | null;
  currencyValue: number;
}

export function AuthenticatedUserLogoWithCurrency(props: Props) {
  return (
    <Box display={'flex'} alignItems={'center'}>
      {/* <Avatar alt="Wallet icon" src={props.wallet.imageUrl} sx={{ marginRight: '10px' }}  /> */}
      <Typography sx={{ marginBottom: '15px' }} variant="body1">
        $TREP: {props.currencyValue}
      </Typography>
    </Box>
  );
}
