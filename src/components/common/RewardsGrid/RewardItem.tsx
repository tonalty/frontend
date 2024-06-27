import { FC } from 'react';
import { Image, Subheadline, Text } from '@telegram-apps/telegram-ui';

import { Mode } from '@/enums/Mode';
import { DeleteCircleIcon } from '@/icons/DeleteCircleIcon';
import { Reward } from '@/interfaces/Reward';

interface Props {
  reward: Reward;
  mode: Mode;
}

export const RewardItem: FC<Props> = ({ reward, mode }) => {
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
          // TODO: onClick to delete
        />
      ) : null}
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
