'use client';

import { Subheadline, TypographyProps } from '@telegram-apps/telegram-ui';

export const FormInputTitle = ({ ...restProps }: TypographyProps) => {
  return <Subheadline level="2" weight="2" {...restProps} />;
};
