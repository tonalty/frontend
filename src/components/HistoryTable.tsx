import { useEffect, useState } from 'react';
import { HistoryItem } from '@/interfaces/HistoryItem';
import axios from 'axios';
import { Cell, IconButton, Caption, Section } from '@telegram-apps/telegram-ui';
import { HistoryType } from '@/enums/HistoryType';
import { ReactionIcon } from '@/icons/ReactionIcon';
import { ReferralIcon } from '@/icons/ReferralIcon';
import { HistoryTablePoint } from './HistoryTablePoint';

export default function HistoryTable() {
  const [history, setHistory] = useState<HistoryItem[] | null>(null);

  const fetchHistory = async () => {
    const history = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/history/user?limit=10`, {
      headers: { tmaInitData: window.Telegram.WebApp.initData }
    });

    setHistory(history.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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
    <Section style={{ width: '100%', paddingTop: '15px' }}>
      <Caption
        level="1"
        weight="3"
        caps
        style={{ height: '30px', display: 'flex', alignItems: 'center', paddingLeft: '12px' }}>
        Transaction history
      </Caption>

      {history?.map((item) => {
        let title;
        let mappedIcon;

        if (item.data.type === HistoryType.messageReaction) {
          title = 'Reaction';
          mappedIcon = <ReactionIcon />;
        } else if (item.data.type === HistoryType.refferalJoin) {
          title = `User @${item.data.username} joined via link`;
          mappedIcon = <ReferralIcon />;
        }

        return (
          <Cell
            key={item.data.chatId}
            style={{ width: '100%', boxSizing: 'border-box', background: 'inherit' }}
            before={
              <IconButton mode="plain" size="s">
                {mappedIcon}
              </IconButton>
            }
            subtitle={formatDate(item.createdAt)}
            after={<HistoryTablePoint points={item.data.points} />}>
            {title}
          </Cell>
        );
      })}
    </Section>
  );
}
