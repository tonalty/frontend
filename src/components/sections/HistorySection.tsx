import { FC } from 'react';
import { Cell, IconButton, Text } from '@telegram-apps/telegram-ui';

import { useUserHistory } from '@/api/queries';
import { TriggerType } from '@/enums/TriggerType';
import { getIcon } from '@/utils/common';
import { HistoryTablePoint } from '../HistoryTablePoint';
import { NoData } from '../NoData';
import { SectionWithTitleContainer } from '../SectionWithCaptionContainer';
import { HistoryItem } from '@/interfaces/HistoryItem';

interface Props {
  id: number;
}

export const HistorySection: FC<Props> = ({ id }: Props) => {
  const { data: history } = useUserHistory(id);

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

  const getTitleForReferral = (history: HistoryItem) => {
    if (history.data.isOwner) {
      return `User @${history.data.username} joined via link`;
    }

    return `You joined the link and recieved ${history.data.points}`;
  };

  return (
    <SectionWithTitleContainer title="Transaction history">
      {history?.map((item) => {
        const title = getTitleForReferral(item);
        const mappedIcon = getIcon(item.data.type);

        return (
          <Cell
            key={item.data.chatId}
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
