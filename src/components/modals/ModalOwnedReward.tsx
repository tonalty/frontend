import { FC } from 'react';
import { useModalInstance } from 'react-modal-state';

import { ModalWrapper } from '@/components/ModalWrapper';
import { RewardInfoBlock } from '../common/RewardInfoBlock';

export interface ModalOwnedRewardProps {
  title: string;
  imageUrl: string;
  description: string;
  rewardMessage: string;
  value: number;
}

export const ModalOwnedReward: FC = () => {
  const {
    data: { title, imageUrl, description, rewardMessage, value },
    isOpen,
    close
  } = useModalInstance<ModalOwnedRewardProps>();

  return (
    <>
      <ModalWrapper
        headerTitle={title ?? 'Reward'}
        open={isOpen}
        onOpenChange={(open) => !open && close()}>
        <div style={{ padding: 20 }}>
          <RewardInfoBlock
            imageUrl={imageUrl}
            description={description}
            rewardMessage={rewardMessage}
            value={value}
          />
        </div>
      </ModalWrapper>
    </>
  );
};
