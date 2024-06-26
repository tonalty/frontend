import { useState } from 'react';
import { Placeholder } from '@telegram-apps/telegram-ui';

import { EarnPointsButton } from '@/components/EarnPointsButton';
import { ModalBodyReferral } from '@/components/ModalBodyReferral';
import { ModalWrapper } from '@/components/ModalWrapper';
import { SectionWithTitleContainer } from '@/components/SectionWithCaptionContainer';
import { TriggerType } from '@/enums/TriggerType';
import { CommunityUser } from '@/interfaces/CommunityUser';

enum Titles {
  messageReaction = '1 emoji reaction',
  refferalJoin = '1 invited member'
}

interface Props {
  communityUser: CommunityUser;
}

export const EarnPoints = (props: Props) => {
  const [currentTriggerType, setCurrentTriggerType] = useState<TriggerType | ''>('');
  const [isTriggered, setIsTriggered] = useState(false);

  const handleModalOpen = (value: boolean) => {
    setIsTriggered(value);
  };

  const handleClick = (type: TriggerType) => {
    setIsTriggered(true);
    setCurrentTriggerType(type);
  };
  return (
    <SectionWithTitleContainer title="Earn points">
      <ModalWrapper
        headerTitle={
          currentTriggerType === TriggerType.messageReaction
            ? Titles.messageReaction
            : Titles.refferalJoin
        }
        handleModalOpen={handleModalOpen}
        isTriggered={isTriggered}>
        {currentTriggerType === TriggerType.messageReaction ? (
          <Placeholder header="Set any 1+ available or premium reactions and earn points"></Placeholder>
        ) : (
          <ModalBodyReferral communityUser={props.communityUser}></ModalBodyReferral>
        )}
      </ModalWrapper>
      <EarnPointsButton
        title="1 emoji reaction"
        onClick={handleClick}
        type={TriggerType.messageReaction}
        points={5}></EarnPointsButton>

      <EarnPointsButton
        title="1 invited member"
        onClick={handleClick}
        type={TriggerType.refferalJoin}
        points={50}></EarnPointsButton>
    </SectionWithTitleContainer>
  );
};
