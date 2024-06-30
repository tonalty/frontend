import { useState } from 'react';
import { Box } from '@mui/material';

import { useAdminCommunities, useUserCommunities } from '@/api/queries';
import { CommunitiesManaging } from '@/components/CommunitiesManaging';
import { CommunitiesSubscribed } from '@/components/CommunitiesSubscribed';
import { Menu } from '@/components/Menu';
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
          <CommunitiesSubscribed community={userCommunities} />
        ) : null}

        {currentView === View.MANAGED ? <CommunitiesManaging community={adminCommunities} /> : null}
      </Box>
    </>
  );
}
