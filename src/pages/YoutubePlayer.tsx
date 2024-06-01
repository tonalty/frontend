import { Box } from '@mui/material';
import React, { useState } from 'react';
import styled from "styled-components";

// does not autoplay the video due to recent restrictions on most modern browsers
// disabling autoplay feature on iframe YouTube video
// Users have to manually play the video. Autoplay on most mobile platforms is blocked to prevent unsolicited downloads.
// However, YouTube supports few parameters for playing videos automatically.
// So, adding '?autoplay=1' at the end of the video URL will make YouTube videos play automatically:

export const YoutubeImage = styled.img`
  object-fit: contain;
  height: 350px;
  width: 100px;
  border-radius: 30px;
`;
                // <img width="300" height="450" src={imageUrl} alt="Click to play video" />

export const YouTubePlayer: React.FC<{ embedId: string }> = ({ embedId }) => {
    const [playVideo, setPlayVideo] = useState(false);

    const videoUrl = `https://www.youtube.com/embed/${embedId}`;
    // const imageUrl = `https://img.youtube.com/vi/${embedId}/0.jpg`; // this URL points to the video's thumbnail image
    // const imageUrl = `https://icones.pro/wp-content/uploads/2021/02/youtube-play-icone.png`; // this URL points to the video's thumbnail image
    const imageUrl = `https://www.ohmyworld.es/wp-content/uploads/2016/02/YouTube-logo-play-icon1-e1455723974137-330x330.png`; // this URL points to the video's thumbnail image

    const handleClick = () => {
        setPlayVideo(true);
    };
// https://i.ytimg.com/vi/Wr747SGDTCk/maxresdefault.jpg
    return (
        <Box onClick={handleClick} style={{ cursor: 'pointer' }}>
            {playVideo ? (
                // Adding '?autoplay=1' at the end of the video URL will make YouTube videos play automatically: see below
                <iframe
                    width="400"
                    height="450"
                    src={`${videoUrl}?autoplay=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YoutubeVideo"
                />
            ) : (
                <YoutubeImage src={imageUrl}></YoutubeImage>
            )}
        </Box>
    );
};

export default YouTubePlayer;