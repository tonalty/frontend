import { Box, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { YouTubePlayer } from './YoutubePlayer';

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
                <Typography variant="h1" fontSize="30px">
                    How to invite bot
                </Typography>

                <Typography variant="body2" textAlign="center" marginY={2} sx={{ fontSize: '16px', width: '300px', marginBottom: '15px'}}>
                    Click on the icon below to understand how to add bot to the group chat
                </Typography>

                <YouTubePlayer embedId="h4AwKkES0Xg" />

                <Box display="flex" sx={{ width: '100%', justifyContent: 'space-around' }}>
                    <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none'}}>
                        <Button variant="text">Back</Button>
                    </Link>

                    <Link to={`/connectcommunity`} style={{ color: 'inherit', textDecoration: 'none'}}>
                        <Button variant="contained">Connect Bot</Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
}