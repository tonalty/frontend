import { FC } from 'react';
import { Avatar, Caption, Skeleton, Title } from '@telegram-apps/telegram-ui';

import { CommunityName } from '@/components/common/CommunityName';
import { Community } from '@/interfaces/Community';

interface Props {
  community?: Community;
}

const STATS_KEYS = ['members', 'comments', 'reactions'];

export const ManagedCommunityInfo: FC<Props> = ({ community }) => {
  return (
    <div
      style={{
        padding: '30px 16px 40px',
        background: 'var(--tgui--bg_color)',
        borderRadius: '0 0 12px 12px'
      }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <Skeleton visible={!community} style={{ borderRadius: '50%', overflow: 'hidden' }}>
          {/* TODO: real avatar! */}
          <Avatar size={48} src="https://picsum.photos/200/300" />
        </Skeleton>

        <CommunityName>
          <Skeleton visible={!community}>{community?.title}</Skeleton>
        </CommunityName>

        <div style={{ display: 'flex', gap: 24, marginTop: 10 }}>
          {STATS_KEYS.map((key) => (
            <div style={{ textAlign: 'center' }}>
              <Caption level="1" weight="3" style={{ textTransform: 'capitalize' }}>
                <Skeleton visible={!community}>{key}</Skeleton>
              </Caption>
              <Title level="3" weight="2" style={{ marginTop: 16 }} plain>
                <Skeleton visible={!community}>{community?.members}</Skeleton>
              </Title>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
