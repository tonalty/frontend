import { FC } from 'react';
import { Avatar, Caption, Skeleton, Title as TitleTg } from '@telegram-apps/telegram-ui';

import { Title } from '@/components/common/Title';
import { Community } from '@/interfaces/Community';

interface Props {
  community?: Community;
}

type Stats = (keyof Pick<Community, 'members' | 'comments' | 'reactions'>)[];
const STATS_KEYS: Stats = ['members', 'comments', 'reactions'];

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

        <Skeleton visible={!community}>
          <Title>{community ? community.title : 'skeleton'}</Title>
        </Skeleton>

        <div style={{ display: 'flex', gap: 24, marginTop: 10 }}>
          {STATS_KEYS.map((key) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <Skeleton visible={!community}>
                <Caption
                  level="1"
                  weight="3"
                  style={{
                    color: 'var(--tgui--section_header_text_color)',
                    textTransform: 'capitalize'
                  }}>
                  {key}
                </Caption>
              </Skeleton>
              <Skeleton visible={!community}>
                <TitleTg level="3" weight="2" style={{ marginTop: 10 }} plain>
                  {community ? community[key] : 'skeleton'}
                </TitleTg>
              </Skeleton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
