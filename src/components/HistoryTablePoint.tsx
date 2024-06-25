import { formatPoints } from '@/utils/common';

interface Props {
  points: number;
}

export const HistoryTablePoint = (props: Props) => {
  return (
    <span style={{ color: props.points > 0 ? 'inherit' : '#FF3A30' }}>
      {formatPoints(props.points)}
    </span>
  );
};
