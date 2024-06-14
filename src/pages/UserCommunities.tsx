import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { UserCommunity } from "../interfaces/UserCommunity";
import { Community } from "../interfaces/Community";
import { useEffect, useState } from "react";
import axios from "axios";

export function UserCommunities() {
    const [userCommunities, setUserCommunities] = useState<UserCommunity[]>([]);

    const [adminCommunities, setAdminCommunities] = useState<Community[]>([]);

    const fetchData = async () => {
        const userResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/communities/user`, { headers: { tmaInitData: (window as any).Telegram.WebApp.initData } });
        setUserCommunities(userResult.data);

        const adminResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/communities/admin`, { headers: { tmaInitData: (window as any).Telegram.WebApp.initData } });
        setAdminCommunities(adminResult.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (userCommunities.length === 0 && adminCommunities.length === 0) {
        return (
            <>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', alignSelf:'center'}}>
                    <Typography variant="h1" fontSize="30px" textAlign="center">Communities</Typography>

                    <Typography variant="body2" textAlign="center" marginY={2} sx={{ fontSize: '16px', width: '300px', marginBottom: '15px'}}>
                        Here is the list of your telegram channels with points you can get
                    </Typography>
                </Box>
            </>
        )
    }


    return (
        <>           
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', alignSelf:'center'}}>

                <Typography variant="h1" fontSize="30px" textAlign="center">Communities</Typography>
                

                <Typography variant="body2" textAlign="center" marginY={2} sx={{ fontSize: '16px', width: '300px', marginBottom: '15px'}}>
                    Here is the list of your telegram channels with points you can get
                </Typography>

                <Typography variant="body2" textAlign="center" marginTop={2} sx={{ fontSize: '16px'}}>
                    Your communities
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {
                        userCommunities.map((community, index) => {
                            return (
                                <Link to={`/community/${community?.community?.chatId}`} key={index} style={{ color: 'inherit', textDecoration: 'none'}}>
                                    <ListItem className="gbLi" sx={{ marginTop: '10px', borderRadius: '10px' }}>
                                        <ListItemIcon>
                                            <GroupsIcon htmlColor="#0098EA" />
                                        </ListItemIcon>
                                        <ListItemText primary={community?.community?.title} secondary={`Earned points: ${community?.points}`} />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </List>

                <Typography variant="body2" textAlign="center" marginTop={2} sx={{ fontSize: '16px'}}>
                    Manage
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {
                        adminCommunities.map((community, index) => {
                            return (
                                <Link to={`/connectcommunity/${community?.chatId}`} key={index} style={{ color: 'inherit', textDecoration: 'none'}}>
                                    <ListItem className="gbLi" sx={{ marginTop: '10px', borderRadius: '10px' }}>
                                        <ListItemIcon>
                                            <GroupsIcon htmlColor="#0098EA" />
                                        </ListItemIcon>
                                        <ListItemText primary={community.title} />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </List>

                <Link to={`/connectbot`} style={{ marginTop: '15px', color: 'inherit', textDecoration: 'none'}}>
                    <Button>How to connect community</Button>
                </Link>
            </Box>
        </>
    );
}
