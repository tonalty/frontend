import { Button } from '@mui/material';
import { Wallet } from '@tonconnect/ui-react';
import axios from 'axios';

interface Props {
  points?: number;
  chatId?: number;
  wallet: Wallet | null;
}

export function ClaimButton(props: Props) {
  if (!props.points || !props.chatId) {
    return null;
  }

  const handleClick = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/tokens/claimTokens`,
      { chatId: props.chatId, toAddress: props.wallet!.account.address },
      {
        headers: { tmaInitData: window.Telegram.WebApp.initData }
      }
    );
  };

  return (
    <Button variant="contained" disabled={!props.wallet} onClick={handleClick}>
      Claim
    </Button>
  );
}
