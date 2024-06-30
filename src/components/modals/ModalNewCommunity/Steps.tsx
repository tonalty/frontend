import { FC, PropsWithChildren } from 'react';
import { Link, Title } from '@telegram-apps/telegram-ui';
import styled from 'styled-components';

const WrapperStepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  color: var(--tgui--link_color);
  border-radius: 50%;
  background: rgba(0, 122, 255, 0.08);
`;

const StepNumber: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WrapperStepNumber>
      <Title level="3" plain weight="2">
        {children}
      </Title>
    </WrapperStepNumber>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const StepTextWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StepRow = styled.div`
  display: flex;
  gap: 16px;

  &:not(:last-of-type) ${StepTextWrapper} {
    &::before {
      position: absolute;
      bottom: -12px;
      width: 100%;
      height: 1px;
      background: var(--tgui--plain_background);
      content: '';
    }
  }
`;

export const Steps = () => {
  return (
    <Wrapper>
      <StepRow>
        <StepNumber>1</StepNumber>
        <StepTextWrapper>
          <div>
            Add <Link>@tonaltybot</Link> as admin
          </div>
        </StepTextWrapper>
      </StepRow>

      <StepRow>
        <StepNumber>2</StepNumber>
        <StepTextWrapper>
          <div>Set up triggers and rewards</div>
        </StepTextWrapper>
      </StepRow>

      <StepRow>
        <StepNumber>3</StepNumber>
        <StepTextWrapper>
          <div>Engage your audience to interaction</div>
        </StepTextWrapper>
      </StepRow>
    </Wrapper>
  );
};
