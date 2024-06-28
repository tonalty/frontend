import { useParams } from 'react-router-dom';

import { useTriggersByChatId, useUserCommunity } from '@/api/queries';
import { RewardShopSection } from '@/components/sections/RewardShopSection';
import { SectionWithTitleContainer } from '@/components/SectionWithCaptionContainer';
import { SetupTasksForm } from '@/components/SetupTasksForm';
import { Mode } from '@/enums/Mode';
import { HistorySection } from '@/components/sections/HistorySection';

export const Manage = () => {
  const { id } = useParams();
  const { data: userCommunity } = useUserCommunity(id);
  const { data: triggers } = useTriggersByChatId(id);

  console.log(triggers);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <SectionWithTitleContainer title="Set up tasks">
        {id && triggers && <SetupTasksForm id={Number(id)} triggers={triggers} />}
      </SectionWithTitleContainer>

      <RewardShopSection communityUser={userCommunity} mode={Mode.Admin} />
      <HistorySection id={Number(id)} />
    </div>
  );
};
