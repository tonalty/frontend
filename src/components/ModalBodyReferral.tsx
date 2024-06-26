import { Placeholder } from '@telegram-apps/telegram-ui';

import { CommunityUser } from '@/interfaces/CommunityUser';
import { ReferralLink } from './ReferralLink';

interface Props {
  communityUser: CommunityUser;
}

export const ModalBodyReferral = (props: Props) => {
  return (
    <Placeholder
      header="Invite new members 
            and earn points"
      description={
        <>
          <ReferralLink {...props} />
        </>
      }></Placeholder>
  );
};
