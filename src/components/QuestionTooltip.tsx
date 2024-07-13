import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@telegram-apps/telegram-ui';

import { QuestionIcon } from '@/icons/QuestionIcon';

interface Props {
  text: string;
}

export const QuestionTooltip = ({ text }: Props) => {
  const toolTipRef = useRef<HTMLDivElement>(null);
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
    <>
      <div ref={toolTipRef} onClick={onClickTooltip} style={{ cursor: 'pointer' }}>
        <QuestionIcon />
      </div>
      {tooltipVisible && (
        <Tooltip
          mode="dark"
          placement="bottom-end"
          targetRef={toolTipRef}
          style={{ maxWidth: 320 }}>
          {text}
        </Tooltip>
      )}
    </>
  );
};
