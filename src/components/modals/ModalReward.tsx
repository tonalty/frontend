import { FC, useState } from 'react';
import { useModalInstance } from 'react-modal-state';

import { useBuyReward } from '@/api/mutations';
import { useUserRewardById } from '@/api/queries';
import { ModalWrapper } from '@/components/ModalWrapper';
import { ErrorSnackbar } from '../common/ErrorSnackbar';
import { RewardInfoBlock } from '../common/RewardInfoBlock';

export interface ModalRewardProps {
  rewardId: string;
  chatId?: string | number;
}

export const ModalReward: FC = () => {
  const {
    data: { rewardId, chatId },
    isOpen,
    close
  } = useModalInstance<ModalRewardProps>();
  const { data: reward } = useUserRewardById(rewardId, chatId);
  const { mutateAsync: buyReward } = useBuyReward();
  const [error, setError] = useState<Error | null>(null);

  const handleGetClick = async () => {
    if (!rewardId || !chatId) {
      // TODO: validation
      return;
    }

    try {
      // TODO: show value after buy
      await buyReward({ rewardId, chatId: Number(chatId) });
      close();
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <>
      {error && <ErrorSnackbar error={error} onClose={() => setError(null)} />}

      <ModalWrapper
        headerTitle={reward?.title ?? 'Reward'}
        open={isOpen}
        onOpenChange={(open) => !open && close()}>
        <div style={{ padding: 20 }}>
          <RewardInfoBlock
            imageUrl={reward?.imageUrl}
            description={reward?.description}
            onGetClick={handleGetClick}
            value={reward?.value}
          />
        </div>
      </ModalWrapper>
    </>
  );
};
