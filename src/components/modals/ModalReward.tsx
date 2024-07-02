import { FC, PropsWithChildren, useState } from 'react';
import { useModalInstance } from 'react-modal-state';
import { Button, Caption, Image, Subheadline } from '@telegram-apps/telegram-ui';

import { useBuyReward } from '@/api/mutations';
import { useUserRewardById } from '@/api/queries';
import { ModalWrapper } from '@/components/ModalWrapper';
import { ErrorSnackbar } from '../common/ErrorSnackbar';

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

export const ModalReward: FC = () => {
  const {
    data: { rewardId, chatId },
    isOpen,
    close
  } = useModalInstance<{
    rewardId: string;
    chatId?: string | number;
  }>();
  const { data: reward } = useUserRewardById(rewardId, chatId);
  const { mutateAsync: buyReward } = useBuyReward();
  const [error, setError] = useState<Error | null>(null);

  const handleGetClick = async () => {
    if (!rewardId || !chatId) {
      // TODO: validation
      return;
    }

    try {
      // TODO: show value after buy
      await buyReward({ rewardId, chatId: Number(chatId) });
      close();
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <>
      {error && <ErrorSnackbar error={error} onClose={() => setError(null)} />}

      <ModalWrapper
        headerTitle={reward?.title ?? 'Reward'}
        open={isOpen}
        onOpenChange={(open) => !open && close()}>
        <div style={{ padding: 20 }}>
          <Image
            src={reward?.imageUrl}
            size={96}
            style={{ aspectRatio: '1 / 1', width: 'unset', height: 'unset' }}
          />

          <div style={{ display: 'grid', flexDirection: 'column', gap: 32, marginTop: 20 }}>
            <div style={{ display: 'grid', flexDirection: 'column', gap: 15 }}>
              <SubTitle>Description</SubTitle>
              <Text>{reward?.description}</Text>
            </div>
            {reward?.rewardMessage ? (
              <div style={{ display: 'grid', flexDirection: 'column', gap: 15 }}>
                <SubTitle>Reward message</SubTitle>
                <Text>{reward.rewardMessage}</Text>
              </div>
            ) : null}
          </div>

          <Button size="l" stretched onClick={handleGetClick} style={{ marginTop: 21 }}>
            GET
          </Button>

          <Value>{reward?.value}</Value>
        </div>
      </ModalWrapper>
    </>
  );
};
