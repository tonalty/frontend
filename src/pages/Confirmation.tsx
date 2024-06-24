import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function Confirmation() {
  return (
    <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
      <Typography variant="h1" fontSize="30px">
        Confirmation
      </Typography>

      <Box marginY={'30px'} borderRadius={'30px'}>
        <img
          src="https://cdn11.bigcommerce.com/s-g5m7dxaevg/images/stencil/1280x1280/products/307/1549/56__64108.1666686998.jpg?c=1"
          width={'200px'}
        ></img>
      </Box>

      <Box>
        <Typography variant="body1" display="flex">
          Discount: <Box sx={{ fontWeight: 600, paddingLeft: '5px' }}> 20% </Box>
        </Typography>

        <Typography variant="body1" display="flex">
          Price: <Box sx={{ fontWeight: 600, paddingLeft: '5px' }}> 100 $TREP </Box>
        </Typography>

        {/* <Typography variant="body1" display="flex">
                    Commission: <Box sx={{ fontWeight: 600, paddingLeft: '5px' }}> 100 $TREP </Box>
                </Typography> */}
      </Box>

      <Box
        sx={{ display: 'flex', marginTop: '30px', justifyContent: 'space-around', width: '100%' }}
      >
        <Link to={`/`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button variant="text">Go back</Button>
        </Link>
        <Button variant="contained">Purchase</Button>
      </Box>
    </Box>
  );
}
