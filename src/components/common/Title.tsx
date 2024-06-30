import { FC, PropsWithChildren } from 'react';
import { Title as TitleTg } from '@telegram-apps/telegram-ui';

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TitleTg level="2" weight="2" plain style={{ display: 'inline' }}>
      {children}
    </TitleTg>
  );
};
