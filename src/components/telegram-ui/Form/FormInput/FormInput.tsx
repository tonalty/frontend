'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState } from 'react';
import { callMultiple } from '@telegram-apps/telegram-ui/dist/helpers/function';
import { hasReactNode } from '@telegram-apps/telegram-ui/dist/helpers/react/node';
import { classNames } from '@tma.js/sdk-react';

import { FormInputTitle } from './components/FormInputTitle';
import styles from './FormInput.module.css';

export interface FormPublicProps {
  /** Defines the visual state of the form input (e.g., error, focused). */
  status?: 'default' | 'error' | 'focused';
  /** Optional header content, displayed above the form input on `base` platform. */
  header?: ReactNode;
  /** Content to be displayed before the form input, such as icons or labels. */
  before?: ReactNode;
  /** Content to be displayed after the form input, often used for action icons or additional information. */
  after?: ReactNode;
  /** Indicates if the form input is disabled. */
  disabled?: boolean;
}

export interface FormInputProps extends FormPublicProps, HTMLAttributes<HTMLLabelElement> {}

const formStatusStyles = {
  default: styles['wrapper--default'],
  error: styles['wrapper--error'],
  focused: styles['wrapper--focused']
};

/**
 * Wraps an input element with additional layout for headers, icons, or actions, providing a consistent look and feel across the form.
 * It supports conditional rendering based on the platform and the state of the form element.
 */
export const FormInput = forwardRef<HTMLDivElement, FormInputProps>(
  (
    {
      status,
      header,
      before,
      after,
      disabled,
      children,
      className,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...restProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const formStatus = status || (isFocused ? 'focused' : 'default');

    const onFocus = callMultiple(onFocusProp, () => {
      if (disabled) {
        return;
      }

      setIsFocused(true);
    });
    const onBlur = callMultiple(onBlurProp, () => setIsFocused(false));

    return (
      <div
        ref={ref}
        className={classNames(
          styles.wrapper,
          styles['wrapper'],
          formStatusStyles[formStatus],
          disabled && styles['wrapper--disabled']
        )}
        aria-disabled={disabled}>
        <label
          aria-disabled={disabled}
          className={classNames(styles.body, className)}
          onFocus={onFocus}
          onBlur={onBlur}
          {...restProps}>
          {hasReactNode(before) && <div className={styles.before}>{before}</div>}
          {children}
          {hasReactNode(after) && <div className={styles.after}>{after}</div>}
        </label>
        {hasReactNode(header) && <FormInputTitle className={styles.title}>{header}</FormInputTitle>}
      </div>
    );
  }
);
