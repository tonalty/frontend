import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTonWallet } from '@tonconnect/ui-react';
import axios from 'axios';

import { ConnectWalletWithPlaceholder } from '@/components/ConnectWalletWithPlaceholder';

export function ConnectCommunity() {
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [tokensToMint, setTokensToMint] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const { id } = useParams();

  const wallet = useTonWallet();

  const handleTokenNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenName(event.target.value);
  };
  const handleTokenSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenSymbol(event.target.value);
  };
  const handleTokensToMintChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokensToMint(Number(event.target.value));
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleClick = async () => {
    const body = {
      chatId: id,
      name: tokenName,
      description,
      symbol: tokenSymbol,
      tokensToMint: tokensToMint
    };
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tokens/mintTokens`, body, {
      headers: { tmaInitData: window.Telegram.WebApp.initData }
    });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="40px">
        <Typography variant="h1" fontSize="30px">
          Connect your community
        </Typography>

        <ConnectWalletWithPlaceholder isAuthenticated={Boolean(wallet)}>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ fontSize: '16px', width: '250px', marginBottom: '15px', fontWeight: '600' }}>
            To mint your community tokens connect your wallet
          </Typography>
        </ConnectWalletWithPlaceholder>

        <TextField
          id="outlined-basic"
          label="Token name"
          value={tokenName}
          onChange={handleTokenNameChange}
          variant="outlined"
          fullWidth
          disabled={!wallet}
        />
        <TextField
          id="filled-basic"
          label="Token symbol"
          value={tokenSymbol}
          onChange={handleTokenSymbolChange}
          variant="outlined"
          fullWidth
          disabled={!wallet}
        />
        <TextField
          id="standard-basic"
          label="Tokens to mint"
          value={tokensToMint}
          onChange={handleTokensToMintChange}
          variant="outlined"
          fullWidth
          disabled={!wallet}
        />
        <TextField
          id="standard-basic"
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          variant="outlined"
          fullWidth
          disabled={!wallet}
        />
        {/* is admin */}
        {/* <TextField id="standard-basic" 
                    label="Reactions threshold" 
                    defaultValue="1"
                    variant="filled"
                    fullWidth 
                    disabled={!Boolean(wallet)}
                />
                <TextField 
                    id="standard-basic"
                    label="Reward points"
                    defaultValue="5"
                    variant="filled"
                    fullWidth
                    disabled={!Boolean(wallet)}
                /> */}
        {/* is admin */}

        <Box display="flex" sx={{ width: '100%', justifyContent: 'space-around' }}>
          <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none' }}>
            <Button variant="text">Go back</Button>
          </Link>

          <Button variant="contained" disabled={!wallet} onClick={handleClick}>
            Mint Tokens
          </Button>
        </Box>
      </Box>
    </>
  );
}
