import { FC, useState } from 'react';
import { classNames, useMiniApp } from '@tma.js/sdk-react';

import { useBotStatus } from '@/api/queries';
import { EarnPointsButton } from '@/components/EarnPointsButton';
import { SectionWithTitleContainer } from '@/components/SectionWithCaptionContainer';
import { TriggerType } from '@/enums/TriggerType';
import { ErrorIcon } from '@/icons/ErrorIcon';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { Triggers } from '@/interfaces/Triggers';
import { ModalEarnPoints } from '../modals/ModalEarnPoints';
import styles from './EarnPointsSection.module.css';

interface Props {
  communityUser: CommunityUser;
  triggers: Triggers;
  chatId?: number;
}

export const EarnPointsSection: FC<Props> = ({ communityUser, triggers, chatId }: Props) => {
  const [currentTriggerType, setCurrentTriggerType] = useState<TriggerType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const miniApp = useMiniApp();

  const { data: status } = useBotStatus(chatId);

  if (status && !status.isAdmin) {
    return (
      <SectionWithTitleContainer className={classNames(styles.wrapper)} title="Earn points">
        <div className={classNames(styles.svgWrapper)}>
          <ErrorIcon></ErrorIcon>
        </div>
        <div className={classNames(styles.msg, miniApp.isDark ? styles.msgDark : '')}>
          To get bonus rewards, the bot should has an administrator access to the group.
        </div>
      </SectionWithTitleContainer>
    );
  }

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
