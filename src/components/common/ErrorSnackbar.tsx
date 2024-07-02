import { FC } from 'react';
import { Snackbar } from '@telegram-apps/telegram-ui';

interface Props {
  error?: Error;
  onClose: () => void;
}

export const ErrorSnackbar: FC<Props> = ({ error, onClose }) => {
  return (
    <Snackbar
      description={error?.message}
      onClose={onClose}
      style={{ zIndex: 'var(--tgui--z-index--overlay)' }}>
      Error
    </Snackbar>
  );
};
