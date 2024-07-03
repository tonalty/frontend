import { useState } from 'react';
import { Box } from '@mui/material';

import { useAdminCommunities, useUserCommunities } from '@/api/queries';
import { ScrollArea } from '@/components/common/ScrollArea';
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

      {currentView === View.SUBSCRIBED ? (
        <CommunitiesSubscribed communities={userCommunities} />
      ) : null}

      {currentView === View.MANAGED ? <CommunitiesManaging communities={adminCommunities} /> : null}
    </div>
  );
}
