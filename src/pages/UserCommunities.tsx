import { useState } from 'react';
import { Box } from '@mui/material';

import { useAdminCommunities, useUserCommunities } from '@/api/queries';
import { ManagedCommunity } from '@/components/ManagedCommunity';
import { Menu } from '@/components/Menu';
import { SubscribedCommunity } from '@/components/SubscribedCommunity';
import { View } from '@/enums/View';

export function UserCommunities() {
  const { data: userCommunities, error: userCommunitiesError } = useUserCommunities();
  const { data: adminCommunities, error: adminCommunitiesError } = useAdminCommunities();

  const [currentView, setCurrentView] = useState(View.SUBSCRIBED);
  const onClickView = (view: View) => {
    setCurrentView(view);
  };

  if (userCommunitiesError || adminCommunitiesError) {
    return <Box>{JSON.stringify([adminCommunitiesError, adminCommunitiesError])}</Box>;
  }

  return (
    <>
      <Menu
        currentView={currentView}
        subscribed={userCommunities}
        managed={adminCommunities}
        onClickView={onClickView}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          alignSelf: 'center'
        }}>
        {currentView === View.SUBSCRIBED ? (
          <SubscribedCommunity community={userCommunities} />
        ) : null}

        {currentView === View.MANAGED ? <ManagedCommunity community={adminCommunities} /> : null}
      </Box>
    </>
  );
}
