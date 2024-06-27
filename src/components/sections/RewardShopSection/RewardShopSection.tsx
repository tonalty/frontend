import { FC } from 'react';
import { Box } from '@mui/material';
import { Button, Link } from '@telegram-apps/telegram-ui';

import { useRewardsByChatId } from '@/api/queries';
import { RewardsGrid } from '@/components/common/RewardsGrid';
import { Mode } from '@/enums/Mode';
import { PlusCircleIcon } from '@/icons/PlusCircleIcon';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { ModalAllRewards } from '../../modals/ModalAllRewards';
import { ModalCreateOrUpdateReward } from '../../modals/ModalCreateOrUpdateReward';
import { SectionWithTitleContainer } from '../../SectionWithCaptionContainer';
import { Section } from '../../telegram-ui/Blocks';

interface Props {
  communityUser?: CommunityUser;
  mode: Mode;
}

export const RewardShopSection: FC<Props> = ({ communityUser, mode }) => {
  const { data: rewards } = useRewardsByChatId(communityUser?.chatId);

  return (
    <SectionWithTitleContainer
      title={
        <Section.Header>
          <Box display="flex" justifyContent="space-between">
            REWARD SHOP{' '}
            <ModalAllRewards
              communityUser={communityUser}
              mode={mode}
              trigger={<Link style={{ cursor: 'pointer' }}>SEE ALL</Link>}
            />
          </Box>
        </Section.Header>
      }>
      <div style={{ gap: 20 }}>
        {rewards ? <RewardsGrid mode={mode} rewards={rewards} /> : null}

        {mode === Mode.Admin ? (
          <ModalCreateOrUpdateReward
            communityUser={communityUser}
            trigger={
              <Button size="l" stretched before={<PlusCircleIcon />}>
                Add new
              </Button>
            }
          />
        ) : null}
      </div>
    </SectionWithTitleContainer>
  );
};
