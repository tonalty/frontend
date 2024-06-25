import { Modal } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';

interface Props {
  headerTitle: string;
  isTriggered: boolean;
  handleModalOpen: (value: boolean) => void;
  children: string | JSX.Element | JSX.Element[];
}

export const ModalWrapper = (props: Props) => {
  return (
    <Modal
      preventScrollRestoration={false}
      overlayComponent={<>hello</>}
      header={<ModalHeader>{props.headerTitle}</ModalHeader>}
      open={props.isTriggered}
      onOpenChange={props.handleModalOpen}>
      {props.children}
    </Modal>
  );
};
