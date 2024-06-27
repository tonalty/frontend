import { FC } from 'react';
import { ModalProps, Placeholder } from '@telegram-apps/telegram-ui';

import { TriggerType } from '@/enums/TriggerType';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { ModalWrapper } from '../ModalWrapper';
import { ReferralLink } from '../ReferralLink';

enum Titles {
  messageReaction = '1 emoji reaction',
  referralJoin = '1 invited member'
}

interface Props extends ModalProps {
  currentTriggerType?: TriggerType;
  communityUser: CommunityUser;
}

export const ModalEarnPoints: FC<Props> = ({ currentTriggerType, communityUser, ...rest }) => {
  return (
    <ModalWrapper
      headerTitle={
        currentTriggerType === TriggerType.messageReaction
          ? Titles.messageReaction
          : Titles.referralJoin
      }
      {...rest}>
      {currentTriggerType === TriggerType.messageReaction ? (
        <Placeholder header="Set any 1+ available or premium reactions and earn points" />
      ) : (
        <Placeholder
          header="Invite new members and earn points"
          description={<ReferralLink communityUser={communityUser} />}
        />
      )}
    </ModalWrapper>
  );
};
