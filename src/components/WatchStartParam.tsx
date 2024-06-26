import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const WatchStartParam: FC<{ startParam?: string }> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (props?.startParam) {
      navigate('/join-community');
    }
  }, [props.startParam]);

  return <>{JSON.stringify(location.search)}</>;
};
