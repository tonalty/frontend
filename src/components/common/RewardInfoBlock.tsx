import { FC, PropsWithChildren } from 'react';
import { Button, Caption, Image, Subheadline } from '@telegram-apps/telegram-ui';

const SubTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Caption level="1" weight="3" caps style={{ color: 'var(--tgui--section_header_text_color)' }}>
      {children}
    </Caption>
  );
};

const Text: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Subheadline level="2" weight="3">
      {children}
    </Subheadline>
  );
};

const Value: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.04)',
        marginTop: 32
      }}>
      <div style={{ color: 'var(--tgui--section_header_text_color)' }}>Value</div>
      <Text>{children}</Text>
    </div>
  );
};

interface Props {
  imageUrl?: string;
  description?: string;
  rewardMessage?: string;
  onGetClick?: () => void;
  value?: number;
}

export const RewardInfoBlock: FC<Props> = ({
  imageUrl,
  description,
  rewardMessage,
  onGetClick,
  value
}) => {
  return (
    <>
      <Image
        src={imageUrl}
        size={96}
        style={{ aspectRatio: '1 / 1', width: 'unset', height: 'unset' }}
      />

      <div style={{ display: 'grid', flexDirection: 'column', gap: 32, marginTop: 20 }}>
        <div style={{ display: 'grid', flexDirection: 'column', gap: 15 }}>
          <SubTitle>Description</SubTitle>
          <Text>{description}</Text>
        </div>
        {rewardMessage ? (
          <div style={{ display: 'grid', flexDirection: 'column', gap: 15 }}>
            <SubTitle>Reward message</SubTitle>
            <Text>{rewardMessage}</Text>
          </div>
        ) : null}
      </div>

      {onGetClick ? (
        <Button size="l" stretched onClick={onGetClick} style={{ marginTop: 21 }}>
          GET
        </Button>
      ) : null}

      <Value>{value}</Value>
    </>
  );
};
