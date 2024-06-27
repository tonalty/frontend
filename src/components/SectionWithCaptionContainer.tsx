import { FC, PropsWithChildren, ReactNode } from 'react';

import { Section } from './telegram-ui/Blocks';

interface Props {
  title: ReactNode;
}

export const SectionWithTitleContainer: FC<PropsWithChildren<Props>> = (props) => {
  return <Section header={props.title}>{props.children}</Section>;
};
