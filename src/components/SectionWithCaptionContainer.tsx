import { Section } from '@telegram-apps/telegram-ui';

interface Props {
  children: string | JSX.Element | JSX.Element[];
  title: string;
}

export const SectionWithTitleContainer = (props: Props) => {
  return (
    <Section style={{ width: '100%', paddingTop: '15px' }} header={props.title}>
      {props.children}
    </Section>
  );
};
