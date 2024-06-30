import { FC, PropsWithChildren } from 'react';
import { Title } from '@telegram-apps/telegram-ui';

export const CommunityName: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Title level="2" weight="2" plain>
      {children}
    </Title>
  );
};
