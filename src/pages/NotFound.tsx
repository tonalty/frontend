import { Text, Title } from '@telegram-apps/telegram-ui';
import styled from 'styled-components';

import { NotFoundSticker } from '@/components/NotFoundSticker';

const Container = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  reason?: string;
}

export const NotFound = (props: Props) => {
  return (
    <Container>
      <ContentWrapper>
        <NotFoundSticker />
        <Title weight="1" style={{ paddingTop: 20 }}>
          Whoops
        </Title>
        <Text style={{ paddingTop: 8, color: '#707579' }}>Something went wrong</Text>
        {props.reason && (
          <Text style={{ paddingTop: 8, color: '#707579' }}>Reason: {props.reason}</Text>
        )}
      </ContentWrapper>
    </Container>
  );
};
