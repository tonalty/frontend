import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Cell, FixedLayout, Text } from '@telegram-apps/telegram-ui';
import { classNames, useMiniApp } from '@tma.js/sdk-react';

import { PlusCircleIcon } from '@/icons/PlusCircleIcon';
import { CommunityUser } from '@/interfaces/CommunityUser';
import styles from './Item.module.css';
import { ModalNewCommunity } from './modals/ModalNewCommunity/ModalNewCommunity';
import { NoData } from './NoData';

interface Props {
  community: CommunityUser[];
}

export const CommunitiesManaging: FC<Props> = ({ community }) => {
  const miniApp = useMiniApp();

  return (
    <div style={{ width: '100%', paddingBottom: '80px' }}>
      {community.length ? (
        community.map((community, index) => {
          const avatarSrc = `https://picsum.photos/seed/${community.chatId}/200/300`;

          return (
            <Link
              className="disableHover"
              to={`/manage/${community.chatId}`}
              state={{ avatarSrc: avatarSrc }}
              key={index}
              style={{ color: 'inherit', textDecoration: 'none', background: 'inherit' }}>
              <Cell
                className={classNames(
                  miniApp.isDark ? styles.whiteText : styles.darkText,
                  styles.cell
                )}
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

      <FixedLayout style={{ padding: 16 }}>
        <ModalNewCommunity
          trigger={
            <Button size="l" stretched before={<PlusCircleIcon />}>
              Add new
            </Button>
          }
        />
      </FixedLayout>
    </div>
  );
};
