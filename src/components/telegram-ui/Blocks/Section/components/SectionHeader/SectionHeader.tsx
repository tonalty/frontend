'use client';

import { HTMLAttributes } from 'react';
import { classNames } from '@tma.js/sdk-react';

import { useHeaderComponents } from './hooks/useHeaderComponents';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps extends HTMLAttributes<HTMLHeadElement> {
  /** Large title, changes font size, padding and color */
  large?: boolean;
}

// TODO: title and right
export const SectionHeader = ({ large, className, children, ...restProps }: SectionHeaderProps) => {
  const { Default, Large } = useHeaderComponents();

  const Component = large ? Large : Default;
  return (
    <header
      className={classNames(
        styles.wrapper,
        styles['wrapper'],
        large && styles['wrapper--large'],
        className
      )}
      {...restProps}>
      <Component Component="h1" className={styles.title}>
        {children}
      </Component>
    </header>
  );
};
