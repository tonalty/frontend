'use client';

import { InputHTMLAttributes } from 'react';
import { Subheadline } from '@telegram-apps/telegram-ui';
import { classNames } from '@tma.js/sdk-react';

import { FormInput, FormPublicProps } from '../FormInput/FormInput';
import styles from './Input.module.css';

export interface InputProps extends FormPublicProps, InputHTMLAttributes<HTMLInputElement> {}

/**
 * Renders a text input field with enhanced styling and integration into a form structure. Supports customization through `FormPublicProps` and standard input attributes.
 * It automatically adapts typography and layout based on the platform, ensuring a consistent user experience across devices.
 */
export const Input = ({
  type = 'text',
  header,
  before,
  after,
  status,
  className,
  disabled,
  ...restProps
}: InputProps) => {
  return (
    <FormInput
      header={header}
      before={before}
      after={after}
      status={status}
      disabled={disabled}
      className={classNames(styles.wrapper, className)}>
      <Subheadline
        Component="input"
        className={styles.input}
        type={type}
        disabled={disabled}
        {...restProps}
      />
    </FormInput>
  );
};
