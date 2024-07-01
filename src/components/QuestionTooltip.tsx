import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@telegram-apps/telegram-ui';

import { QuestionIcon } from '@/icons/QuestionIcon';

export const QuestionTooltip = () => {
  const toolTipRef = useRef<SVGSVGElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const onClickTooltip = (e: BaseSyntheticEvent) => {
    console.log(e);
    setTooltipVisible(!tooltipVisible);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (toolTipRef.current && !toolTipRef.current.contains(event.target as Node)) {
      setTooltipVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', top: -36, right: 0 }}>
      <QuestionIcon ref={toolTipRef} onClick={onClickTooltip}></QuestionIcon>
      {tooltipVisible && (
        <Tooltip
          mode="dark"
          placement="bottom-end"
          targetRef={toolTipRef as unknown as HTMLElement}>
          Set up triggers for rewarding actions within a Telegram channel, enable comments and
          reactions, then monitor your events and reward users accordingly.
        </Tooltip>
      )}
    </div>
  );
};
