import { Box, Typography } from "@mui/material";
import { TonConnectButton } from "@tonconnect/ui-react";

export function PointShop() {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Typography variant="h1" fontSize="30px">Point shop</Typography>
                <TonConnectButton />
            </Box>
        </>
    );
}