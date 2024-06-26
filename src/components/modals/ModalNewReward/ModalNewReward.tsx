import { FC, ReactNode } from 'react';
import { Button } from '@telegram-apps/telegram-ui';

import { ModalWrapper } from '../../ModalWrapper';
import { Input, Slider, Textarea } from '../../telegram-ui';
import { UploadImage } from './UploadImage';

interface Props {
  trigger: ReactNode;
}

export const ModalNewReward: FC<Props> = (props) => {
  return (
    <ModalWrapper headerTitle="All rewards" trigger={props.trigger}>
      <div
        style={{
          padding: '0 20px 30px'
        }}>
        <div
          style={{
            display: 'grid',
            gridGap: 3
          }}>
          <UploadImage />
          <Input header="Title" placeholder="Come up with a reward name" />
          <Input header="Value" placeholder="Come up with a reward name" />
          <Slider
            style={{
              marginTop: 13
            }}
          />
          <Textarea header="Description" placeholder="Come up with a reward description" />
          <Input
            header="Reward message"
            placeholder="Hidden message, available for the owner only"
          />
        </div>
        <Button
          size="l"
          stretched
          style={{
            marginTop: 24
          }}>
          Create
        </Button>
      </div>
    </ModalWrapper>
  );
};
