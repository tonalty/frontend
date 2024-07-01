import { FC } from 'react';
import { Cell, IconButton, Text } from '@telegram-apps/telegram-ui';

import { useUserHistory } from '@/api/queries';
import { TriggerType } from '@/enums/TriggerType';
import { HistoryItem } from '@/interfaces/HistoryItem';
import { getIcon } from '@/utils/common';
import { HistoryTablePoint } from '../HistoryTablePoint';
import { NoData } from '../NoData';
import { SectionWithTitleContainer } from '../SectionWithCaptionContainer';

interface Props {
  chatId?: string | number;
}

export const HistorySection: FC<Props> = ({ chatId }: Props) => {
  const { data: history } = useUserHistory(chatId);

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
    if (history.data.type === TriggerType.messageReaction) {
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
        const mappedIcon = getIcon(item.data.type);

        return (
          <Cell
            key={item.data.chatId + index}
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
            after={<HistoryTablePoint points={item.data.points} />}>
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
