import { useParams } from 'react-router-dom';

import { useCommunity } from '@/api/queries';
import { ManagedCommunityInfo } from '@/components/ManagedCommunityInfo';
import { HistorySection } from '@/components/sections/HistorySection';
import { RewardShopSection } from '@/components/sections/RewardShopSection';
import { SetupTasksSection } from '@/components/sections/SetupTasksSection';
import { Mode } from '@/enums/Mode';

export const CommunityManage = () => {
  const { id: chatId } = useParams();
  const { data: community } = useCommunity(chatId);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <ManagedCommunityInfo community={community} />

      <SetupTasksSection chatId={chatId} triggers={community?.triggers} />
      <RewardShopSection chatId={chatId} mode={Mode.Admin} />
      <HistorySection chatId={chatId} />
    </div>
  );
};
