import { Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CommunityUser } from "../interfaces/CommunityUser";

interface Props {
    communityUser: CommunityUser | null;
}

export const Container = styled.div`
    margin: 15px;
`;

export function ReferralLink(props: Props) {
    let { id } = useParams();
    const [referral, setReferral] = useState('');

    // addChatMember
    const fetchReferral = async () => {
        try {
            const link = await axios.post<unknown, { data: string }>(`${import.meta.env.VITE_BACKEND_URL}/referrals`, { 
                chatId: Number(id),
                title: props.communityUser?.communityName
            }, 
            { 
                headers: { tmaInitData: (window as any).Telegram.WebApp.initData,
            }});

            setReferral(link.data);
        } catch(error) {
            console.log(`Failed to fetch referral ${error}`);
        }
    }

    useEffect(() => {
        fetchReferral()
    }, [])


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referral);
        } catch (error) {
            console.error(`Can't copy to clipboard ${error}`);
        }
    }

    return (
        <Container>
            <Typography variant="body2" >Share the link to your shop to get more points</Typography>
            <Paper elevation={5} sx={{ display: 'flex', 'align-items': 'center'}}>
                <InputBase
                    disabled
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={referral ? referral : 'Check that bot has admin rights for group!'}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleCopy}>
                    <ContentCopyIcon />
                </IconButton>
            </Paper>
        </Container>
    )
} 