import { Avatar, Box, Typography } from "@mui/material";
import { Wallet, WalletInfoWithOpenMethod } from "@tonconnect/ui-react";

interface Props {
    wallet: Wallet | (Wallet & WalletInfoWithOpenMethod) | null,
    currencyValue: number,
}

export function AuthenticatedUserLogoWithCurrency(props: Props) {
    return (
        <Box display={'flex'} alignItems={'center'} sx={{ margin: '10px 0'}}>
            <Avatar alt="Wallet icon" src={''} sx={{ marginRight: '10px' }}  />
            <Typography variant="body1">$TREP: {props.currencyValue}</Typography>
        </Box>
    )
}