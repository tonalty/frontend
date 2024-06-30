import { FC } from 'react';
import { Box } from '@mui/material';
import { Button, Link } from '@telegram-apps/telegram-ui';

import { useRewardsByChatId } from '@/api/queries';
import { RewardsGrid } from '@/components/common/RewardsGrid';
import { Mode } from '@/enums/Mode';
import { PlusCircleIcon } from '@/icons/PlusCircleIcon';
import { ModalAllRewards } from '../../modals/ModalAllRewards';
import { ModalCreateOrUpdateReward } from '../../modals/ModalCreateOrUpdateReward';
import { SectionWithTitleContainer } from '../../SectionWithCaptionContainer';
import { Section } from '../../telegram-ui/Blocks';

interface Props {
  chatId?: string | number;
  mode: Mode;
}

export const RewardShopSection: FC<Props> = ({ chatId, mode }) => {
  const { data: rewards } = useRewardsByChatId(chatId, 0, 3);

  return (
    <SectionWithTitleContainer
      title={
        <Section.Header>
          <Box display="flex" justifyContent="space-between">
            REWARD SHOP{' '}
            <ModalAllRewards
              chatId={chatId}
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
            chatId={chatId}
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
