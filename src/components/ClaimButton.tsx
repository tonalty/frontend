import { Button } from "@mui/material"
import { Wallet, WalletInfoWithOpenMethod } from "@tonconnect/ui-react"
import axios from "axios";

interface Props {
    wallet: Wallet,
    points: number,
}


export function ClaimButton(props: Props) {
    if (!props.points) {
        return null;
    }

    const handleClick = async () => {
        await axios.post('https://tonalty.localhost.direct:3000/tokens/claimTokens', { toAddress: props.wallet.account.address }, { 
            headers: { tmaInitData: window.Telegram.WebApp.initData }
        });
    }

    return (
        <Button variant="contained" disabled={!Boolean(props.wallet)} onClick={handleClick}>Claim</Button>
    )
}