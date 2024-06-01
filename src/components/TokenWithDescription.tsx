import { Box } from "@mui/material";
import { TonConnectButton } from "@tonconnect/ui-react";

export interface Props  { 
    children: React.ReactNode,
    isAuthenticated: boolean
}

export function ConnectWalletWithPlaceholder(props: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px'}}>
            { !props.isAuthenticated ? props.children : null }
            <TonConnectButton />
        </Box>
    )
}