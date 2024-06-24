import { NoDataIcon } from '@/icons/NoDataIcon';

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

export const NoData = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '338px',
        justifyContent: 'space-evenly'
      }}>
      <NoDataIcon />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {props.children}
      </div>
    </div>
  );
};
