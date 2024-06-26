import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import { Box } from '@mui/material';
import { Button, Image, Link, Subheadline, Text } from '@telegram-apps/telegram-ui';

import { PlusCircleIcon } from '@/icons/PlusCircleIcon';
import { ModalAllRewards } from '../../modals/ModalAllRewards';
import { ModalNewReward } from '../../modals/ModalNewReward';
import { SectionWithTitleContainer } from '../../SectionWithCaptionContainer';
import { Section } from '../../telegram-ui/Blocks';

const products = [
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq__sgD-quFzFtu4Qa2H_JeRW3sDwGI5Q4uA&s',
    title: 'Welcome 10% Discount',
    subtitle: '2,500.00'
  },
  {
    src: 'https://cdn11.bigcommerce.com/s-g5m7dxaevg/images/stencil/1280x1280/products/307/1549/56__64108.1666686998.jpg?c=1',
    title: 'x322',
    subtitle: '2,500.00'
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq__sgD-quFzFtu4Qa2H_JeRW3sDwGI5Q4uA&s',
    title: 'x324',
    subtitle: '2,500.00'
  }
];

export const RewardShopSection = () => {
  return (
    <SectionWithTitleContainer
      title={
        <Section.Header>
          <Box display="flex" justifyContent="space-between">
            REWARD SHOP{' '}
            <ModalAllRewards trigger={<Link style={{ cursor: 'pointer' }}>SEE ALL</Link>} />
          </Box>
        </Section.Header>
      }>
      <div>
        <div style={{ display: 'flex' }}>
          {/* <Carousel
            swipeable={true}
            autoPlay={true}
            showArrows={false}
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}> */}
          {/* {products.map((product, index) => (
            <div key={index} style={{ flex: 1 }}>
              <Image src={product.src} size={96} />

              <Text weight="2">{product.title}</Text>
              <Subheadline level="2" weight="3">
                {product.subtitle}
              </Subheadline>
            </div>
          ))} */}
          {/* </Carousel> */}
        </div>

        {/* TODO: show onlye for admin */}
        <ModalNewReward
          trigger={
            <Button size="l" stretched before={<PlusCircleIcon />}>
              Add new
            </Button>
          }
        />
      </div>
    </SectionWithTitleContainer>
  );
};
