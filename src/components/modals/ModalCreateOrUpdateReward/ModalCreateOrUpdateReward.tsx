import { FC, ReactNode, useState } from 'react';
import { Button } from '@telegram-apps/telegram-ui';

import { useCreateReward, useUpdateReward } from '@/api/mutations';
import { CreatedTempImage } from '@/interfaces/CreatedTempImage';
import { Reward } from '@/interfaces/Reward';
import { setNumberInputValue } from '@/utils/setNumberInputValue';
import { ModalWrapper } from '../../ModalWrapper';
import { Input, Textarea } from '../../telegram-ui';
import { UploadImage } from './UploadImage';

interface Props {
  chatId?: string | number;
  reward?: Reward;
  trigger: ReactNode;
}

// TODO: need refactor of this form, cause we have a lot of rewards and want to have ability to
// update any of them, so we must hav only one instance of this Modal to avoid performance issues
export const ModalCreateOrUpdateReward: FC<Props> = ({ chatId, reward, trigger }) => {
  const [isOpen, setIsOpen] = useState<boolean>();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const [uploadedTempImage, setUploadedTempImage] = useState<CreatedTempImage>();
  const [title, setTitle] = useState<string | undefined>(reward?.title);
  const [value, setValue] = useState<string | undefined>(reward?.value.toString());
  const [description, setDescription] = useState<string | undefined>(reward?.description);
  const [rewardMessage, setRewardMessage] = useState<string | undefined>(reward?.rewardMessage);
  const { mutateAsync: createReward } = useCreateReward();
  const { mutateAsync: updateReward } = useUpdateReward();

  const handleImageUploaded = (res: CreatedTempImage) => {
    setUploadedTempImage(res);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue, notShow, floatValue } = setNumberInputValue(e.target.value);
    if (!isNaN(floatValue) && !notShow) setValue(newValue);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleRewardMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRewardMessage(e.target.value);
  };

  const handleCreateOrUpdateRewardClick = async () => {
    if (!chatId || !uploadedTempImage || !title || !value || !description || !rewardMessage) {
      // TODO: validation
      return;
    }

    if (!reward) {
      await createReward({
        chatId: Number(chatId),
        imageId: uploadedTempImage.id,
        title,
        value: Number(value),
        description,
        rewardMessage
      });
    } else {
      await updateReward({
        id: reward.id,
        chatId: Number(chatId),
        imageId: uploadedTempImage.id,
        title,
        value: Number(value),
        description,
        rewardMessage
      });
    }
    setIsOpen(false);
  };

  return (
    <ModalWrapper
      headerTitle="New reward"
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={trigger}>
      <div
        style={{
          padding: '0 20px 30px'
        }}>
        <div
          style={{
            display: 'grid',
            gridGap: 3
          }}>
          <UploadImage imageUrl={reward?.imageUrl} onImageUploaded={handleImageUploaded} />
          <Input
            header="Title"
            placeholder="Come up with a reward name"
            value={title}
            onChange={handleTitleChange}
          />
          <Input header="Value" placeholder="0.00" value={value} onChange={handleValueChange} />
          {/* TODO: slider sync with value */}
          {/* <Slider
            style={{
              marginTop: 13
            }}
          /> */}
          <Textarea
            header="Description"
            placeholder="Come up with a reward description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Input
            header="Reward message"
            placeholder="Hidden message, available for the owner only"
            value={rewardMessage}
            onChange={handleRewardMessage}
          />
        </div>

        <Button
          size="l"
          stretched
          style={{
            marginTop: 24
          }}
          onClick={handleCreateOrUpdateRewardClick}>
          Create
        </Button>
      </div>
    </ModalWrapper>
  );
};
