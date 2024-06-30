import { FC, ReactNode } from 'react';

import { useRewardsByChatId } from '@/api/queries';
import { RewardsGrid } from '@/components/common/RewardsGrid';
import { ModalWrapper } from '@/components/ModalWrapper';
import { Mode } from '@/enums/Mode';

interface Props {
  chatId?: string | number;
  mode: Mode;
  trigger: ReactNode;
}

// TODO: pagination
export const ModalAllRewards: FC<Props> = ({ chatId, mode, trigger }) => {
  const { data: rewards } = useRewardsByChatId(chatId);

  return (
    <ModalWrapper headerTitle="All rewards" trigger={trigger}>
      <div style={{ padding: 20 }}>
        {rewards ? <RewardsGrid rewards={rewards} mode={mode} /> : null}
      </div>
    </ModalWrapper>
  );
};
