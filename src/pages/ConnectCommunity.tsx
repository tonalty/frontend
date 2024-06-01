import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

export function ConnectCommunity() {
    const [jetonName, setJetonName] = useState<string>('');
    const [jetonSymbol, setJetonSymbol] = useState<string>('');
    const [tokensToMint, setTokensToMint] = useState<string>(0);
    const [description, setDescription] = useState<string>('');

    const handleJetonNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJetonName(event.target.value);
    };
    const handleJetonSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJetonSymbol(event.target.value);
    };
    const handleTokensToMintChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokensToMint(event.target.value);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                gap="40px"
            >
                <Typography variant="h1" fontSize="30px">Connect your community</Typography>
                <TextField
                    id="outlined-basic"
                    label="Jeton name"
                    value={jetonName}
                    onChange={handleJetonNameChange}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="filled-basic"
                    label="Jeton symbol"
                    value={jetonSymbol}
                    onChange={handleJetonSymbolChange}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="standard-basic"
                    label="Tokens to mint"
                    value={tokensToMint}
                    onChange={handleTokensToMintChange}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="standard-basic"
                    label="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    variant="outlined"
                    fullWidth
                />
                {/* is admin */}
                <TextField id="standard-basic" 
                    label="Reactions threshold" 
                    defaultValue="1"
                    variant="filled"
                    fullWidth 
                    disabled
                />
                <TextField 
                    id="standard-basic"
                    label="Min points per message"
                    defaultValue="5"
                    variant="filled"
                    fullWidth
                    disabled
                />
                {/* is admin */}

                <Box display="flex">
                    <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none'}}>
                        <Button variant="text">Go back</Button>
                    </Link>

                    <Button variant="contained">Mint Jetons</Button>
                </Box>
            </Box>
        </>
    );
}
