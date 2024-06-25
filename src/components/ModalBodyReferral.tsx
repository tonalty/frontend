import { Placeholder } from '@telegram-apps/telegram-ui';
import { ReferralLink } from './ReferralLink';
import { CommunityUser } from '@/interfaces/CommunityUser';

interface Props {
  communityUser: CommunityUser;
}

export const ModalBodyReferral = (props: Props) => {
  return (
    <Placeholder
      header="Invite new members 
            and earn points"
      description={<ReferralLink {...props} />}></Placeholder>
  );
};
