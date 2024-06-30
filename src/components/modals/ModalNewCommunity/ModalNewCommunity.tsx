import { FC, ReactNode, useState } from 'react';
import { Button } from '@telegram-apps/telegram-ui';

import { useAdminCommunities } from '@/api/queries';
import { Title } from '@/components/common/Title';
import { RefreshIcon } from '@/icons/RefreshIcon';
import { ModalWrapper } from '../../ModalWrapper';
import { Steps } from './Steps';
import tonalty from './tonalty.svg';

interface Props {
  trigger: ReactNode;
}

export const ModalNewCommunity: FC<Props> = ({ trigger }) => {
  const { refetch } = useAdminCommunities();
  const [isModalOpen, setIsModalOpen] = useState<boolean>();

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  const handleUpdateClick = async () => {
    await refetch();
    handleModalOpenChange(false);
  };

  return (
    <ModalWrapper
      headerTitle="New community"
      trigger={trigger}
      open={isModalOpen}
      onOpenChange={handleModalOpenChange}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 16,
          gap: 43,
          textAlign: 'center'
        }}>
        <Title>
          How to connect Tonalty
          <br /> to your group?
        </Title>

        <img src={tonalty} />

        <Steps />

        <Button
          mode="gray"
          size="l"
          before={<RefreshIcon />}
          style={{ color: 'var(--tgui--link_color)' }}
          stretched
          onClick={handleUpdateClick}>
          Update channels list
        </Button>
      </div>
    </ModalWrapper>
  );
};
