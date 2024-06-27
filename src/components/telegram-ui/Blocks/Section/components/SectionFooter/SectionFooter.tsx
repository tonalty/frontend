'use client';

import { HTMLAttributes } from 'react';
import { Caption, TypographyProps } from '@telegram-apps/telegram-ui';
import { classNames } from '@tma.js/sdk-react';

import styles from './SectionFooter.module.css';

export interface SectionFooterProps extends HTMLAttributes<HTMLElement> {
  /** Centering text, adding additional indents */
  centered?: boolean;
}

const FooterTypography = ({ ...restProps }: TypographyProps) => {
  return <Caption {...restProps} />;
};

export const SectionFooter = ({
  className,
  children,
  centered,
  ...restProps
}: SectionFooterProps) => {
  return (
    <footer
      className={classNames(
        styles.wrapper,
        styles['wrapper--ios'],
        centered && styles['wrapper--centered'],
        className
      )}
      {...restProps}>
      <FooterTypography className={styles.text}>{children}</FooterTypography>
    </footer>
  );
};
