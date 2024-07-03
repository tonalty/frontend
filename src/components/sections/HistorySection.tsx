import { FC } from 'react';
import { useModal } from 'react-modal-state';
import { Cell, IconButton, Text } from '@telegram-apps/telegram-ui';

import { useUserHistory } from '@/api/queries';
import { TriggerType } from '@/enums/TriggerType';
import { HistoryItem } from '@/interfaces/HistoryItem';
import { getIcon } from '@/utils/common';
import { HistoryTablePoint } from '../HistoryTablePoint';
import { ModalOwnedReward, ModalOwnedRewardProps } from '../modals/ModalOwnedReward';
import { NoData } from '../NoData';
import { SectionWithTitleContainer } from '../SectionWithCaptionContainer';

interface Props {
  chatId?: string | number;
}

export const HistorySection: FC<Props> = ({ chatId }: Props) => {
  const { data: history } = useUserHistory(chatId);
  const { open: openOwnedRewardModal } = useModal(ModalOwnedReward);

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);

    const options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    } as Intl.DateTimeFormatOptions;

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getTitle = (history: HistoryItem) => {
    if (history.data.type === TriggerType.rewardBuy) {
      return history.data.rewardTitle;
    } else if (history.data.type === TriggerType.messageReaction) {
      return 'Reaction';
    } else if (history.data.type === TriggerType.referralJoin && history.data.isOwner) {
      return `User @${history.data.username} joined via link`;
    } else {
      return `You joined the link and recieved ${history.data.points}`;
    }
  };

  return (
    <SectionWithTitleContainer title="Transaction history">
      {history?.map((item, index) => {
        const title = getTitle(item);
        const data = item.data;

        const mappedIcon = getIcon(
          data.type,
          false,
          data.type === TriggerType.rewardBuy ? data.rewardImageUrl : undefined
        );

        if (data.type === TriggerType.rewardBuy) {
          return (
            // TODO make link
            <Cell
              key={index}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'inherit'
              }}
              before={
                <IconButton mode="plain" size="s">
                  {mappedIcon}
                </IconButton>
              }
              subtitle={formatDate(item.createdAt)}
              after={<HistoryTablePoint points={-data.rewardValue} />}
              onClick={() =>
                openOwnedRewardModal<ModalOwnedRewardProps>({
                  title: data.rewardTitle,
                  imageUrl: data.rewardImageUrl,
                  description: data.rewardDescription,
                  rewardMessage: data.rewardMessage,
                  value: data.rewardValue
                })
              }>
              <span style={{ whiteSpace: 'pre-wrap' }}>{title}</span>
            </Cell>
          );
        }

        return (
          <Cell
            key={data.chatId + index}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'inherit'
            }}
            before={
              <IconButton mode="plain" size="s">
                {mappedIcon}
              </IconButton>
            }
            subtitle={formatDate(item.createdAt)}
            after={<HistoryTablePoint points={data.points} />}>
            <span style={{ whiteSpace: 'pre-wrap' }}>{title}</span>
          </Cell>
        );
      })}
      {history?.length === 0 ? (
        <NoData>
          <Text weight="1">No transactions yet</Text>
          <Text weight="3">Check triggers and start earning rewards</Text>
        </NoData>
      ) : null}
    </SectionWithTitleContainer>
  );
};
