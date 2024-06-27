'use client';

import { Caption, Subheadline, TypographyProps } from '@telegram-apps/telegram-ui';

export const useHeaderComponents = () => {
  const Default = ({ ...restProps }: TypographyProps) => {
    return <Caption caps {...restProps} />;
  };

  const Large = ({ ...restProps }: TypographyProps) => {
    return <Subheadline level="1" weight="2" {...restProps} />;
  };

  return {
    Default,
    Large
  };
};
