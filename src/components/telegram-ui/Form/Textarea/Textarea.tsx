'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { Subheadline } from '@telegram-apps/telegram-ui';
import { classNames } from '@tma.js/sdk-react';

import { FormInput, FormPublicProps } from '../FormInput/FormInput';
import styles from './Textarea.module.css';

export interface TextareaProps
  extends Omit<FormPublicProps, 'after' | 'before'>,
    InputHTMLAttributes<HTMLInputElement> {}

/**
 * Wraps a standard HTML textarea element within a `FormInput` container, applying custom styles and functionality.
 * This component inherits the flexible design of the `FormInput`, allowing it to display a header and reflect different status styles.
 * The appearance and behavior of the textarea can be customized through various props, providing a seamless integration with forms.
 */
export const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  ({ type = 'text', header, status, className, ...restProps }: TextareaProps, ref) => {
    return (
      <FormInput
        ref={ref}
        header={header}
        status={status}
        className={classNames(styles.wrapper, className)}>
        <Subheadline Component="textarea" className={styles.textarea} type={type} {...restProps} />
      </FormInput>
    );
  }
);
