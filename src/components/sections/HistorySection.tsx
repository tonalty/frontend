import { FC } from 'react';
import { Cell, IconButton, Text } from '@telegram-apps/telegram-ui';

import { useUserHistory } from '@/api/queries';
import { TriggerType } from '@/enums/TriggerType';
import { getIcon } from '@/utils/common';
import { HistoryTablePoint } from '../HistoryTablePoint';
import { NoData } from '../NoData';
import { SectionWithTitleContainer } from '../SectionWithCaptionContainer';

export const HistorySection: FC = () => {
  const { data: history } = useUserHistory();

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

  return (
    <SectionWithTitleContainer title="Transaction history">
      {history?.map((item) => {
        let title;
        const mappedIcon = getIcon(item.data.type);

        if (item.data.type === TriggerType.messageReaction) {
          title = 'Reaction';
        } else if (item.data.type === TriggerType.referralJoin) {
          title = `User @${item.data.username} joined via link`;
        }

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
