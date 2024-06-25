import { WalletIcon } from '@/icons/WalletIcon';
import { Button, Text } from '@telegram-apps/telegram-ui';

export const ConnectWalletButton = () => {
  return (
    <div style={{ width: '100%', marginTop: '32px' }}>
      <Button
        style={{ width: '100%', height: '54px', padding: '0 10px' }}
        mode="bezeled"
        stretched={false}
        size="m">
        <div style={{ display: 'flex', gap: 8 }}>
          <WalletIcon />
          <Text style={{ color: '#007AFF' }}>Connect wallet</Text>
        </div>
      </Button>
    </div>
  );
};
