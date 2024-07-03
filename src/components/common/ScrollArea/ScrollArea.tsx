import { FC, PropsWithChildren } from 'react';
import { Corner, Root, Scrollbar, Thumb, Viewport } from '@radix-ui/react-scroll-area';

import styles from './ScrollArea.module.css';

export const ScrollArea: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Root className={styles.ScrollAreaRoot}>
      <Viewport className={styles.ScrollAreaViewport}>
        <div>{children}</div>
      </Viewport>
      <Scrollbar orientation="vertical">
        <Thumb className={styles.ScrollAreaThumb} />
      </Scrollbar>
      <Corner className={styles.ScrollAreaCorner} />
    </Root>
  );
};
