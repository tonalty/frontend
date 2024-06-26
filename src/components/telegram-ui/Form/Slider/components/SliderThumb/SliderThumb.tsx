'use client';

import { forwardRef, HTMLAttributes, InputHTMLAttributes } from 'react';
import { VisuallyHidden } from '@telegram-apps/telegram-ui';
import { classNames } from '@tma.js/sdk-react';

import styles from './SliderThumb.module.css';

export interface SliderThumbProps extends HTMLAttributes<HTMLSpanElement> {
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  withTooltip?: boolean;
}

export const SliderThumb = forwardRef<HTMLSpanElement, SliderThumbProps>(
  ({ className, inputProps, withTooltip, ...restProps }, ref) => {
    return (
      <span className={classNames(styles.wrapper, className)} {...restProps}>
        <VisuallyHidden
          {...inputProps}
          Component="input"
          type="range"
          ref={ref}
          className={classNames(styles.input, className)}
          aria-orientation="horizontal"
        />
      </span>
    );
  }
);
