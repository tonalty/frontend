interface Props {
  points: number;
}

export const HistoryTablePoint = (props: Props) => {
  const formatPoints = (points: number) => {
    const sign = points > 0 ? '+' : '-';

    return `${sign}${points.toFixed(2)}`;
  };

  return (
    <span style={{ color: props.points > 0 ? 'inherit' : '#FF3A30' }}>
      {formatPoints(props.points)}
    </span>
  );
};
