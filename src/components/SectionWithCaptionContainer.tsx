import { Caption, Section } from '@telegram-apps/telegram-ui';

interface Props {
  children: string | JSX.Element | JSX.Element[];
  title: string;
}

export const SectionWithTitleContainer = (props: Props) => {
  return (
    <Section style={{ width: '100%', paddingTop: '15px' }}>
      <Caption
        level="1"
        weight="3"
        caps
        style={{ height: '30px', display: 'flex', alignItems: 'center', paddingLeft: '12px' }}>
        {props.title}
      </Caption>

      {props.children}
    </Section>
  );
};
