import { FC, useState } from 'react';
import { Image, Subheadline, Text } from '@telegram-apps/telegram-ui';

import { useCreateImage } from '@/api/mutations';
import { FileInput } from '@/components/telegram-ui';
import { ArrowUpSquareIcon } from '@/icons/ArrowUpSquareIcon';
import { CreatedTempImage } from '@/interfaces/CreatedTempImage';

interface Props {
  imageUrl?: string;
  onImageUploaded: (res: CreatedTempImage) => void;
}

export const UploadImage: FC<Props> = ({ imageUrl, onImageUploaded }) => {
  const { mutateAsync: createImage } = useCreateImage();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(imageUrl);

  const handleCreateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      // TODO: some error
      return;
    }

    try {
      // @ts-expect-error https://github.com/openapi-ts/openapi-typescript/issues/1214
      const res = await createImage({ file });
      onImageUploaded(res);
      setSelectedImage(URL.createObjectURL(file));
    } catch (err) {
      // TODO: toast
    }
  };

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
      {selectedImage ? (
        // @ts-expect-error we want 122
        <Image src={selectedImage} size={122} />
      ) : (
        <>
          <ArrowUpSquareIcon />
          <Text weight="2">Upload image</Text>
          <Subheadline level="2" weight="3">
            Supported: jpg, png, heic up to 5 MB
          </Subheadline>
        </>
      )}
      <FileInput onChange={handleCreateImage} />
    </div>
  );
};
