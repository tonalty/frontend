import { View } from '@/enums/View';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { CommunitiesManaging } from './CommunitiesManaging';
import { CommunitiesSubscribed } from './CommunitiesSubscribed';

interface Props {
  currentView: View;
  userCommunities: CommunityUser[];
  adminCommunities: CommunityUser[];
  isAdminCommunityLoading: boolean;
  isUserCommunityLoading: boolean;
}

export const CommunitiesWrapper = ({
  currentView,
  userCommunities,
  adminCommunities,
  isAdminCommunityLoading,
  isUserCommunityLoading
}: Props) => {
  return (
    <>
      {currentView === View.SUBSCRIBED && (
        <CommunitiesSubscribed isLoading={isAdminCommunityLoading} communities={userCommunities} />
      )}
      {currentView === View.MANAGED && (
        <CommunitiesManaging isLoading={isUserCommunityLoading} communities={adminCommunities} />
      )}
    </>
  );
};
