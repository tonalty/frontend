import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import YouTubePlayer from './YouTubePlayer';

export function ConnectBot() {

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                gap="40px"
            >
                <Typography
                    variant="h1"
                    fontSize="30px"
                >
                    Invite Bot as Admin to channel/group
                </Typography>

                {/*https://www.youtube.com/watch?v=h4AwKkES0Xg*/}
                <YouTubePlayer embedId="h4AwKkES0Xg" />

                {/* is admin */}
                <Box display="flex">
                    <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none'}}>
                        <Button variant="text">Go back</Button>
                    </Link>

                    <Button variant="contained">Connect Bot</Button>
                </Box>
            </Box>
        </>
    );
}
