import { FC, useState } from 'react';

import { EarnPointsButton } from '@/components/EarnPointsButton';
import { SectionWithTitleContainer } from '@/components/SectionWithCaptionContainer';
import { TriggerType } from '@/enums/TriggerType';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { Triggers } from '@/interfaces/Triggers';
import { ModalEarnPoints } from '../modals/ModalEarnPoints';

interface Props {
  communityUser: CommunityUser;
  triggers: Triggers;
}

export const EarnPointsSection: FC<Props> = ({ communityUser, triggers }: Props) => {
  const [currentTriggerType, setCurrentTriggerType] = useState<TriggerType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const handleClick = (type: TriggerType) => {
    setIsModalOpen(true);
    setCurrentTriggerType(type);
  };

  const reactionWord = triggers.reaction.threshold === 1 ? 'reaction' : 'reactions';

  return (
    <>
      <SectionWithTitleContainer title="Earn points">
        {triggers.reaction.isEnabled && (
          <EarnPointsButton
            title={`${triggers.reaction.threshold} emoji ${reactionWord}`}
            onClick={handleClick}
            type={TriggerType.messageReaction}
            points={triggers.reaction.points}
          />
        )}
        {triggers.referral.isEnabled && (
          <EarnPointsButton
            title="1 invited member"
            onClick={handleClick}
            type={TriggerType.referralJoin}
            points={triggers.referral.inviterPoints}
          />
        )}
        {/* communityUser.isAdmin ? triggers.referral.inviterPoints : triggers.referral.inviteePoints */}
      </SectionWithTitleContainer>

      <ModalEarnPoints
        reactionWord={reactionWord}
        threshold={triggers.reaction.threshold}
        open={isModalOpen}
        onOpenChange={handleModalOpen}
        currentTriggerType={currentTriggerType}
        communityUser={communityUser}
      />
    </>
  );
};
