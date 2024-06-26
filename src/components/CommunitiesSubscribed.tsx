import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Cell, Text } from '@telegram-apps/telegram-ui';

import { CommunityUser } from '@/interfaces/CommunityUser';
import { NoData } from './NoData';

const CellStyles = {
  height: '68px',
  marginTop: '32px',
  background: 'inherit',
  borderRadius: '30px'
};

interface Props {
  community: CommunityUser[];
}

export const CommunitiesSubscribed: FC<Props> = ({ community }) => {
  return (
    <div style={{ width: '100%' }}>
      {community.length ? (
        community.map((community, index) => {
          return (
            <Link
              className="disableHover"
              to={`/community/${community.chatId}`}
              key={index}
              style={{ color: 'inherit', textDecoration: 'none', background: 'inherit' }}>
              <Cell
                style={CellStyles}
                subtitle={`Earned points: ${community.points}`}
                before={<Avatar src="https://avatars.githubusercontent.com/u/84640980?v=4" />}>
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
