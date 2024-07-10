import { useState } from 'react';
import { Box } from '@mui/material';

import { useAdminCommunities, useUserCommunities } from '@/api/queries';
import { CommunitiesWrapper } from '@/components/CommunitiesWrapper';
import { Menu } from '@/components/Menu';
import { View } from '@/enums/View';

export function UserCommunities() {
  const {
    data: userCommunities,
    error: userCommunitiesError,
    isFetching: isUserCommunityLoading
  } = useUserCommunities();
  const {
    data: adminCommunities,
    error: adminCommunitiesError,
    isFetching: isAdminCommunityLoading
  } = useAdminCommunities();

  const [currentView, setCurrentView] = useState(View.SUBSCRIBED);
  const onClickView = (view: View) => {
    setCurrentView(view);
  };

  if (userCommunitiesError || adminCommunitiesError) {
    return <Box>{JSON.stringify([adminCommunitiesError, adminCommunitiesError])}</Box>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
      <Menu
        currentView={currentView}
        subscribed={userCommunities}
        managed={adminCommunities}
        onClickView={onClickView}
      />

      <CommunitiesWrapper
        isUserCommunityLoading={isUserCommunityLoading}
        isAdminCommunityLoading={isAdminCommunityLoading}
        currentView={currentView}
        adminCommunities={adminCommunities}
        userCommunities={userCommunities}
      />
    </div>
  );
}
