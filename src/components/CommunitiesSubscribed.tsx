import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Cell, Text } from '@telegram-apps/telegram-ui';
import { classNames } from '@tma.js/sdk-react';

import { CommunityUser } from '@/interfaces/CommunityUser';
import styles from './Item.module.css';
import { NoData } from './NoData';

interface Props {
  community: CommunityUser[];
}

export const CommunitiesSubscribed: FC<Props> = ({ community }) => {
  return (
    <div style={{ width: '100%', paddingBottom: '80px' }}>
      {community.length ? (
        community.map((community, index) => {
          const avatarSrc = `https://picsum.photos/seed/${community.chatId}/200/300`;

          return (
            <Link
              className="disableHover"
              to={`/community/${community.chatId}`}
              key={index}
              state={{ avatarSrc }}
              style={{ color: 'inherit', textDecoration: 'none', background: 'inherit' }}>
              <Cell
                className={classNames(styles.cell)}
                subtitle={`Earned points: ${community.points}`}
                before={<Avatar src={avatarSrc} />}>
                {community?.communityName}
              </Cell>
            </Link>
          );
        })
      ) : (
        <NoData>
          <Text weight="1">No channels yet</Text>
          <Text weight="3">Start connecting bot to your channels</Text>
        </NoData>
      )}
    </div>
  );
};
