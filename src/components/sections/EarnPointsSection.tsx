import { FC, useState } from 'react';
import { Placeholder } from '@telegram-apps/telegram-ui';

import { EarnPointsButton } from '@/components/EarnPointsButton';
import { ModalBodyReferral } from '@/components/ModalBodyReferral';
import { ModalWrapper } from '@/components/ModalWrapper';
import { SectionWithTitleContainer } from '@/components/SectionWithCaptionContainer';
import { TriggerType } from '@/enums/TriggerType';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { ModalEarnPoints } from '../modals/ModalEarnPoints';

interface Props {
  communityUser: CommunityUser;
}

export const EarnPointsSection: FC<Props> = (props) => {
  const [currentTriggerType, setCurrentTriggerType] = useState<TriggerType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const handleClick = (type: TriggerType) => {
    setIsModalOpen(true);
    setCurrentTriggerType(type);
  };
  return (
    <>
      <SectionWithTitleContainer title="Earn points">
        <EarnPointsButton
          title="1 emoji reaction"
          onClick={handleClick}
          type={TriggerType.messageReaction}
          points={5}
        />

        <EarnPointsButton
          title="1 invited member"
          onClick={handleClick}
          type={TriggerType.referralJoin}
          points={50}
        />
      </SectionWithTitleContainer>

      <ModalEarnPoints
        open={isModalOpen}
        onOpenChange={handleModalOpen}
        currentTriggerType={currentTriggerType}
        communityUser={props.communityUser}
      />
    </>
  );
};
