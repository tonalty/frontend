import { FC } from 'react';
import { Avatar } from '@telegram-apps/telegram-ui';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 68px;
  padding: 14px 16px;
  background: var(--tgui--card_bg_color);
  border-radius: 16px;
  font-size: 17px;
  font-weight: 500;
  font-family: var(--tgui--font-family);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-right: 10px;
`;

interface Props {
  avatarSrc: string;
  name: string;
  points?: number;
}

export const CommunityItem: FC<Props> = ({ avatarSrc, name, points }) => {
  return (
    <Wrapper>
      <Left>
        <Avatar src={avatarSrc} />
        {name}
      </Left>
      {points}
    </Wrapper>
  );
};
