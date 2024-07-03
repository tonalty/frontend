import { FC } from 'react';
import { useModal } from 'react-modal-state';
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
  const { open: openCreateOrUpdateRewardModal } = useModal(ModalCreateOrUpdateReward);

  if (!rewards?.length && mode === Mode.User) {
    return null;
  }

  return (
    <SectionWithTitleContainer
      title={
        <Section.Header>
          <Box display="flex" justifyContent="space-between">
            REWARD SHOP{' '}
            {rewards && rewards.length > 3 ? (
              <ModalAllRewards
                chatId={chatId}
                mode={mode}
                trigger={<Link style={{ cursor: 'pointer' }}>SEE ALL</Link>}
              />
            ) : null}
          </Box>
        </Section.Header>
      }>
      <div style={{ gap: 20 }}>
        {rewards ? <RewardsGrid mode={mode} rewards={rewards} /> : null}

        {mode === Mode.Admin ? (
          <Button
            size="l"
            stretched
            before={<PlusCircleIcon />}
            onClick={() => openCreateOrUpdateRewardModal({ chatId })}>
            Add new
          </Button>
        ) : null}
      </div>
    </SectionWithTitleContainer>
  );
};
