import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text } from '@telegram-apps/telegram-ui';

import { PlusCircleIcon } from '@/icons/PlusCircleIcon';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { CommunityItem } from './common/CommunityItem';
import { Loader } from './common/Loader';
import { ScrollArea } from './common/ScrollArea';
import { ModalNewCommunity } from './modals/ModalNewCommunity/ModalNewCommunity';
import { NoData } from './NoData';

interface Props {
  communities: CommunityUser[];
  isLoading: boolean;
}

export const CommunitiesManaging: FC<Props> = ({ communities, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollArea>
        <div style={{ display: 'grid', gap: 8, padding: '16px' }}>
          {communities.length ? (
            communities.map((community, index) => {
              const avatarSrc = community.photoLink || '';

              return (
                <Link
                  key={index}
                  className="disableHover"
                  to={`/manage/${community.chatId}`}
                  state={{ avatarSrc }}
                  style={{ color: 'inherit', textDecoration: 'none', background: 'inherit' }}>
                  <CommunityItem avatarSrc={avatarSrc} name={community.communityName} />
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
      </ScrollArea>

      <div style={{ margin: '16px' }}>
        <ModalNewCommunity
          trigger={
            <Button size="l" stretched before={<PlusCircleIcon />}>
              Add new
            </Button>
          }
        />
      </div>
    </>
  );
};
