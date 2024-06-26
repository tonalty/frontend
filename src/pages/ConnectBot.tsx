import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

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
        <Typography variant="h1" fontSize="20px">
          How to connect your community
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          marginY={2}
          sx={{ fontSize: '16px', width: '300px', marginBottom: '15px' }}
        >
          Click on the icon below to understand how to add bot to the group chat
        </Typography>

        <YouTubePlayer embedId="h4AwKkES0Xg" />

        <Box display="flex" sx={{ width: '100%', justifyContent: 'space-around' }}>
          <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none' }}>
            <Button variant="text">Back</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
