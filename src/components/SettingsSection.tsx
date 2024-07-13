import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Button, Caption, Section, Switch } from '@telegram-apps/telegram-ui';

import { useUpdateSettings } from '@/api/mutations';
import { QuestionTooltip } from '@/components/QuestionTooltip';
import { SectionWithTitleContainer } from '@/components/SectionWithCaptionContainer';
import { RefreshIcon } from '@/icons/RefreshIcon';
import { Settings } from '@/interfaces/Settings';

interface Props {
  chatId: number;
  settings: Settings;
}

export const SettingsSection = ({ settings, chatId }: Props) => {
  const { mutateAsync: updateSettings } = useUpdateSettings();

  const [isTonConnectWalletEnabled, setIsTonConnectWalletEnabled] = useState<boolean>(
    settings.isTonConnectWallet
  );

  useEffect(() => {
    setIsTonConnectWalletEnabled(settings.isTonConnectWallet);
  }, [settings]);

  const onClickUpdateTonWallet = async () => {
    if (isTonConnectWalletEnabled === undefined) {
      return console.error('isTonConnectWalletEnabled cant be undefined');
    }

    const payload = { chatId, settings: { isTonConnectWallet: isTonConnectWalletEnabled } };

    try {
      await updateSettings(payload);
    } catch (error) {
      console.error('Error while updating settings', error);
    }
  };

  const onClickSwitchTonWallet = (e: BaseSyntheticEvent) => {
    setIsTonConnectWalletEnabled(e.target.checked);
  };

  return (
    <SectionWithTitleContainer
      title={
        <Section.Header>
          <Box display="flex" justifyContent="space-between">
            Settings <QuestionTooltip text="Enable / disable Ton Wallet" />
          </Box>
        </Section.Header>
      }>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch checked={isTonConnectWalletEnabled} onChange={onClickSwitchTonWallet} />
        <Caption>Ton Connect Wallet</Caption>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button size="l" stretched before={<RefreshIcon />} onClick={onClickUpdateTonWallet}>
          Update
        </Button>
      </div>
    </SectionWithTitleContainer>
  );
};
