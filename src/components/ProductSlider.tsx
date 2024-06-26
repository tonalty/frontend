import { Carousel } from 'react-responsive-carousel';
import { Box, Typography } from '@mui/material';

import { ProductImage } from './styled/styled';

export function ProductSlider() {
  const products = [
    {
      src: 'https://cdn-icons-png.flaticon.com/512/3488/3488463.png',
      title: 'Telegram subscription',
      subtitle: '50 $TREP'
    },
    {
      src: 'https://cdn11.bigcommerce.com/s-g5m7dxaevg/images/stencil/1280x1280/products/307/1549/56__64108.1666686998.jpg?c=1',
      title: '20% discount',
      subtitle: '100 $TREP'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq__sgD-quFzFtu4Qa2H_JeRW3sDwGI5Q4uA&s',
      title: '30% discount',
      subtitle: '150 $TREP'
    }
  ];

  return (
    <Box width={350}>
      <Carousel
        showArrows={false}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
      >
        {products.map((product, index) => (
          <Box key={index}>
            <ProductImage src={product.src}></ProductImage>

            <Typography variant="body1" textAlign="center">
              {product.title}
            </Typography>

            <Typography variant="body1" textAlign="center">
              {product.subtitle}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
