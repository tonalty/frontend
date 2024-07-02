import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useModalInstance } from 'react-modal-state';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@telegram-apps/telegram-ui';
import * as yup from 'yup';

import { useCreateReward, useDeleteReward, useUpdateReward } from '@/api/mutations';
import { useAdminRewardById } from '@/api/queries';
import { ControllerNumber } from '@/components/common/ControllerNumber';
import { ErrorSnackbar } from '@/components/common/ErrorSnackbar';
import { TrashIcon } from '@/icons/TrashIcon';
import { CreatedTempImage } from '@/interfaces/CreatedTempImage';
import { ModalWrapper } from '../../ModalWrapper';
import { Input, Textarea } from '../../telegram-ui';
import { UploadImage } from './UploadImage';

const schema = yup
  .object({
    title: yup.string().required(),
    value: yup.number().integer().positive().min(0).required(),
    description: yup.string().required(),
    rewardMessage: yup.string().required()
  })
  .required();

export const ModalCreateOrUpdateReward: FC = () => {
  const {
    data: { chatId, rewardId },
    isOpen,
    close
  } = useModalInstance<{
    chatId?: string | number;
    rewardId?: string;
  }>();

  const [uploadedTempImage, setUploadedTempImage] = useState<CreatedTempImage>();
  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const { data: reward, isInitialLoading } = useAdminRewardById(rewardId, chatId);
  const { mutateAsync: createReward } = useCreateReward();
  const { mutateAsync: updateReward } = useUpdateReward();
  const { mutateAsync: deleteReward } = useDeleteReward();
  const [error, setError] = useState<Error | null>(null);

  const handleImageUploaded = (res: CreatedTempImage) => {
    setUploadedTempImage(res);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!rewardId) {
        if ((!chatId && !rewardId) || !uploadedTempImage) {
          // TODO: validation
          return;
        }

        await createReward({
          chatId: Number(chatId),
          imageId: uploadedTempImage.id,
          ...data
        });
      } else {
        if (!chatId && !rewardId) {
          // TODO: validation
          return;
        }

        const image: { imageId?: string; imageUrl?: string } = {};
        if (uploadedTempImage) {
          image.imageId = uploadedTempImage.id;
        } else {
          image.imageUrl = reward?.imageUrl;
        }
        await updateReward({
          id: rewardId,
          chatId: Number(chatId),
          ...image,
          ...data
        });
      }
      close();
    } catch (err) {
      setError(err as Error);
    }
  });

  const handleDeleteReward = async () => {
    try {
      if (!chatId || !rewardId) {
        // TODO: validation
        return;
      }

      await deleteReward({
        rewardId: rewardId,
        chatId: Number(chatId)
      });
    } catch (err) {
      setError(err as Error);
    }
  };

  if (isInitialLoading) {
    return null;
  }

  return (
    <>
      {error && <ErrorSnackbar error={error} onClose={() => setError(null)} />}

      <ModalWrapper
        headerTitle={reward ? reward.title : 'New reward'}
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            reset();
            close();
          }
        }}>
        <form
          onSubmit={onSubmit}
          style={{
            padding: '0 20px 30px'
          }}>
          <div
            style={{
              display: 'grid',
              gridGap: 3
            }}>
            <UploadImage imageUrl={reward?.imageUrl} onImageUploaded={handleImageUploaded} />
            <Controller
              name="title"
              defaultValue={reward?.title}
              control={control}
              render={({ field }) => (
                <Input header="Title" placeholder="Come up with a reward name" {...field} />
              )}
            />
            <ControllerNumber
              name="value"
              defaultValue={reward?.value}
              control={control}
              header="Value"
              placeholder="0.00"
            />
            {/* TODO: slider sync with value */}
            {/* <Slider
            style={{
              marginTop: 13
            }}
          /> */}
            <Controller
              name="description"
              defaultValue={reward?.description}
              control={control}
              render={({ field }) => (
                <Textarea
                  header="Description"
                  placeholder="Come up with a reward description"
                  {...field}
                />
              )}
            />
            <Controller
              name="rewardMessage"
              defaultValue={reward?.rewardMessage}
              control={control}
              render={({ field }) => (
                <Input
                  header="Reward message"
                  placeholder="Hidden message, available for the owner only"
                  {...field}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            size="l"
            stretched
            style={{
              marginTop: 24
            }}>
            {reward ? 'Update' : 'Create'}
          </Button>

          {reward ? (
            <Button
              mode="gray"
              size="l"
              stretched
              style={{
                marginTop: 24
              }}
              before={<TrashIcon />}
              onClick={handleDeleteReward}
            />
          ) : null}
        </form>
      </ModalWrapper>
    </>
  );
};
