import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Community } from "../interfaces/Community";
import GroupsIcon from '@mui/icons-material/Groups';
import { Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';

export function Communities(props) {

    if (!props.communities) {
        return null;
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                {/* <div><p>AJAX: {JSON.stringify(communities)}</p></div> */}

                <Typography variant="h1" fontSize="30px" textAlign="center">Communities</Typography>
                
                <Typography variant="body2" textAlign="center" marginY={2}>
                    Here is the list of you telegram channels with points you can get
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        props.communities.map((community, index) => {
                            return (
                                <Link to={`/community/${community.chatId}`} key={index} style={{ color: 'inherit', textDecoration: 'none'}}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <GroupsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={community.title} secondary={`Total points: ${community.remainingPoints}`} />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </List>
                
                <Link to={`/connectcommunity`} style={{ color: 'inherit', textDecoration: 'none'}}>
                    <Button>Connect your community</Button>
                </Link>
            </Box>
        </>
    );
}
