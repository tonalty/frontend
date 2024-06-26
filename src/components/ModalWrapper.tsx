import { FC, PropsWithChildren } from 'react';
import { Modal, ModalProps } from '@telegram-apps/telegram-ui';

interface Props extends ModalProps {
  headerTitle: string;
}

// TODO: overlayComponent
export const ModalWrapper: FC<PropsWithChildren<Props>> = ({ headerTitle, children, ...rest }) => {
  return (
    <Modal
      preventScrollRestoration={false}
      overlayComponent={undefined}
      header={<Modal.Header>{headerTitle}</Modal.Header>}
      {...rest}>
      {children}
    </Modal>
  );
};
