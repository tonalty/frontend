import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { UserCommunity } from "../interfaces/UserCommunity";

export function UserCommunities(props: { communities: UserCommunity[] }) {

    if (!props.communities) {
        return null;
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', alignSelf:'center'}}>

                <Typography variant="h1" fontSize="30px" textAlign="center">Communities</Typography>
                

                <Typography variant="body2" textAlign="center" marginY={2} sx={{ fontSize: '16px', width: '300px', marginBottom: '15px'}}>
                    Here is the list of your telegram channels with points you can get
                </Typography>

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        props.communities.map((community, index) => {
                            return (
                                <Link to={`/community/${community.community.chatId}`} key={index} style={{ color: 'inherit', textDecoration: 'none'}}>
                                    <ListItem sx={{ marginTop: '10px', borderRadius: '10px', backgroundImage: 'linear-gradient(-225deg, #f6f6f67d 0%, #efefef96 100%);'}}>
                                        <ListItemIcon>
                                            <GroupsIcon htmlColor="#0098EA" />
                                        </ListItemIcon>
                                        <ListItemText primary={community.community.title} secondary={`Earned points: ${community.points}`} />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </List>
                
                {/* <Link to={`/connectcommunity`} style={{ color: 'inherit', textDecoration: 'none'}}>
                    <Button>Connect your community</Button>
                </Link> */}
                
                <Link to={`/connectbot`} style={{ marginTop: '15px', color: 'inherit', textDecoration: 'none'}}>
                    <Button>Connect your community</Button>
                </Link>

                
            </Box>
        </>
    );
}
