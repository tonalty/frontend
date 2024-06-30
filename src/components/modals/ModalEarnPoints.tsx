import { FC } from 'react';
import { Caption, ModalProps, Placeholder } from '@telegram-apps/telegram-ui';

import { TriggerType } from '@/enums/TriggerType';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { ModalWrapper } from '../ModalWrapper';
import { ReferralLink } from '../ReferralLink';

enum Titles {
  referralJoin = '1 invited member'
}

interface Props extends ModalProps {
  currentTriggerType?: TriggerType;
  communityUser: CommunityUser;
  threshold?: number;
  reactionWord: string;
}

export const ModalEarnPoints: FC<Props> = ({
  currentTriggerType,
  communityUser,
  threshold,
  reactionWord,
  ...rest
}) => {
  return (
    <ModalWrapper
      headerTitle={
        currentTriggerType === TriggerType.messageReaction
          ? `${threshold} emoji ${reactionWord}`
          : Titles.referralJoin
      }
      {...rest}>
      {currentTriggerType === TriggerType.messageReaction ? (
        <>
          <Placeholder
            style={{ paddingBottom: '10px' }}
            header={`Set any ${threshold}+ available or premium reactions and earn points`}
          />
          {/* TODO handle this case from backend */}
          <Caption
            style={{ color: 'red', textAlign: 'center', display: 'flex', padding: '0 12px 12px' }}>
            Please, make sure that bot has admin rights inside group! Without it you will not get
            your points.
          </Caption>
        </>
      ) : (
        <Placeholder
          header="Invite new members and earn points"
          description={<ReferralLink communityUser={communityUser} />}
        />
      )}
    </ModalWrapper>
  );
};
