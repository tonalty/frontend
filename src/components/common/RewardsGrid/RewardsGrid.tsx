import { FC } from 'react';

import { Mode } from '@/enums/Mode';
import { Reward } from '@/interfaces/Reward';
import { RewardItem } from './RewardItem';

interface Props {
  rewards: Reward[];
  mode: Mode;
}

export const RewardsGrid: FC<Props> = ({ rewards, mode }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: 16,
        paddingBottom: 20,
        gridTemplateColumns: 'repeat(3, 1fr)'
      }}>
      {rewards.map((reward, index) => (
        <RewardItem key={index} reward={reward} mode={mode} />
      ))}
    </div>
  );
};
