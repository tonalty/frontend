import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

export function Triggers() {

    return (
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            <Typography variant="h1" fontSize="30px">Setting up triggers</Typography>
            <FormGroup sx={{ alignSelf: 'flex-start', marginTop: '30px'}}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="wallet connect => 1 point" />
                <FormControlLabel control={<Checkbox />} label="3+ reactions to comment => 5 point" />

                
            </FormGroup>
            <Button sx={{ marginTop: '30px' }} variant="contained">Add triggers</Button>

            <Typography marginTop={'30px'} variant="h1" fontSize="30px">Setting up rewards</Typography>
            <FormGroup sx={{ alignSelf: 'flex-start', marginTop: '15px'}}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Telegram subscription - 50 $TREP" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="30% discount - 150 $TREP" />
                <FormControlLabel control={<Checkbox />} label="20% discount - 100 $TREP" />
            </FormGroup>

            <Box sx={{ display: 'flex', marginTop: '15px', justifyContent: 'space-around', width: '100%'}}>
                <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none'}}>
                    <Button variant="text">Go back</Button>
                </Link>
                <Button variant="contained" >Add rewards</Button>
            </Box>
        </Box>
    )
}