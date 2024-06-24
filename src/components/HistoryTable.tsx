import { useEffect, useState } from 'react';
import { HistoryItem } from '@/interfaces/HistoryItem';
import axios from 'axios';
import { Cell, IconButton, Caption } from '@telegram-apps/telegram-ui';
import { HistoryType } from '@/enums/HistoryType';
import { ReactionIcon } from '@/icons/ReactionIcon';
import { ReferralIcon } from '@/icons/ReferralIcon';

export default function HistoryTable() {
  const [history, setHistory] = useState<HistoryItem[] | null>(null);

  const fetchHistory = async () => {
    const history = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/history/user?limit=10`, {
      headers: { tmaInitData: (window as any).Telegram.WebApp.initData }
    });

    setHistory(history.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Caption level="1" weight="3">
        Transaction history
      </Caption>

      {history?.map((item) => {
        let title;
        let mappedIcon;

        if (item.data.type === HistoryType.messageReaction) {
          title = 'Reaction';
          mappedIcon = <ReactionIcon />;
        } else if (item.data.type === HistoryType.refferalJoin) {
          title = `User a joined via link`;
          mappedIcon = <ReferralIcon />;
        }

        const date = new Date(item.createdAt);
        const options = {
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        } as Intl.DateTimeFormatOptions;
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        return (
          <Cell
            style={{ width: '100%', boxSizing: 'border-box' }}
            before={
              <IconButton mode="plain" size="s">
                {mappedIcon}
              </IconButton>
            }
            subtitle={formattedDate}
            after={<span>+5.00</span>}
          >
            {title}
          </Cell>
        );
      })}
    </>
  );
}
