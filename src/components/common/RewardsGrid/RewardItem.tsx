import { FC } from 'react';
import { useModal } from 'react-modal-state';
import { Image, Subheadline, Text } from '@telegram-apps/telegram-ui';

import { useDeleteReward } from '@/api/mutations';
import { ModalCreateOrUpdateReward } from '@/components/modals/ModalCreateOrUpdateReward';
import { ModalReward } from '@/components/modals/ModalReward';
import { Mode } from '@/enums/Mode';
import { DeleteCircleIcon } from '@/icons/DeleteCircleIcon';
import { Reward } from '@/interfaces/Reward';

interface RewardCardProps {
  reward: Reward;
  onClick: () => void;
}

const RewardCard: FC<RewardCardProps> = ({ reward, onClick }) => {
  return (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      <Image
        src={reward.imageUrl}
        size={96}
        style={{
          aspectRatio: '1 / 1',
          width: 'unset',
          height: 'unset'
        }}
      />

      <Text weight="2" style={{ display: 'block', marginTop: 5 }}>
        {reward.title}
      </Text>
      <Subheadline level="2" weight="3">
        {reward.value}
      </Subheadline>
    </div>
  );
};

interface Props {
  reward: Reward;
  mode: Mode;
}

export const RewardItem: FC<Props> = ({ reward, mode }) => {
  const { open: openRewardModal } = useModal(ModalReward);
  const { open: openCreateOrUpdateRewardModal } = useModal(ModalCreateOrUpdateReward);
  const { mutateAsync: deleteReward } = useDeleteReward();

  const handleDeleteReward = async () => {
    await deleteReward({
      rewardId: reward.id,
      chatId: reward.chatId
    });
  };

  const handleRewardClick = () => {
    switch (mode) {
      case Mode.User:
        return openRewardModal({
          rewardId: reward.id,
          chatId: reward.chatId
        });
      case Mode.Admin:
        return openCreateOrUpdateRewardModal({
          rewardId: reward.id,
          chatId: reward.chatId
        });
    }
  };

  return (
    <div style={{ position: 'relative', flex: 1 }}>
      {mode === Mode.Admin ? (
        <DeleteCircleIcon
          style={{
            position: 'absolute',
            top: -10,
            right: -9,
            zIndex: 1,
            cursor: 'pointer'
          }}
          onClick={handleDeleteReward}
        />
      ) : null}

      <RewardCard reward={reward} onClick={handleRewardClick} />
    </div>
  );
};
