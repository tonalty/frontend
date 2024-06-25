import { TriggerType } from '@/enums/TriggerType';
import { RightIcon } from '@/icons/RightIcon';
import { formatPoints, getIcon } from '@/utils/common';
import { Button, Caption, IconButton } from '@telegram-apps/telegram-ui';

interface Props {
  title: string;
  points: number;
  type: TriggerType;
  onClick: (type: TriggerType) => void;
}

export const EarnPointsButton = (props: Props) => {
  return (
    <Button
      onClick={(e) => {
        console.log('e', e);
        props.onClick(props.type);
      }}
      mode="gray"
      style={{
        width: '100%',
        height: '60px',
        boxSizing: 'border-box',
        borderRadius: '16px',
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      before={
        <IconButton mode="plain" size="s">
          {getIcon(props.type, true)}
        </IconButton>
      }
      after={
        <IconButton mode="plain">
          <Caption style={{ paddingRight: '8px' }}>{formatPoints(props.points)}</Caption>
          <RightIcon></RightIcon>
        </IconButton>
      }>
      <div
        style={{
          whiteSpace: 'pre-wrap'
        }}>
        {props.title}
      </div>
    </Button>
  );
};
