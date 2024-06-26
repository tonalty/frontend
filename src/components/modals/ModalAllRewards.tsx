import { FC, ReactNode } from 'react';

import { ModalWrapper } from '../ModalWrapper';

interface Props {
  trigger: ReactNode;
}

// TODO:
export const ModalAllRewards: FC<Props> = (props) => {
  return (
    <ModalWrapper headerTitle="All rewards" trigger={props.trigger}>
      ModalAllRewards
    </ModalWrapper>
  );
};
