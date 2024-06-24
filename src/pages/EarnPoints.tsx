import { SectionWithTitleContainer } from '@/components/SectionWithCaptionContainer';
import { HistoryType } from '@/enums/HistoryType';
import { getIcon } from '@/utils/getIcon';
import { Cell, IconButton } from '@telegram-apps/telegram-ui';

export const EarnPoints = () => {
  return (
    <SectionWithTitleContainer title="Earn points">
      <Cell
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'inherit'
        }}
        before={
          <IconButton mode="outline" size="s">
            {getIcon(HistoryType.messageReaction)}
          </IconButton>
        }>
        <span style={{ whiteSpace: 'pre-wrap' }}>heello</span>
      </Cell>
    </SectionWithTitleContainer>
  );
};
