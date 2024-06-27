import { Button, Subheadline, Text } from '@telegram-apps/telegram-ui';

import { ArrowUpSquareIcon } from '@/icons/ArrowUpSquareIcon';

export const UploadImage = () => {
  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
        gridGap: '24px',
        height: '290px',
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderRadius: 12
      }}>
      <ArrowUpSquareIcon />
      <Text weight="2">Upload image</Text>
      <Subheadline level="2" weight="3">
        Supported: jpg, png, heic up to 5 MB
      </Subheadline>
      <Button size="s">Browse files</Button>
    </div>
  );
};
