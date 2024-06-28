'use client';

import { classNames } from '@tma.js/sdk-react';

import styles from './SliderSteps.module.css';
import { Step } from '@telegram-apps/telegram-ui/dist/components/Form/Slider/hooks/types';

export interface SliderStepsProps {
  steps: Step[];
}

export const SliderSteps = ({ steps }: SliderStepsProps) => {
  return (
    <>
      {steps.map(({ isPassed, XCoordinate }) => (
        <div
          key={XCoordinate}
          className={classNames(styles.step, {
            [styles['step--passed'] as string]: isPassed
          })}
          style={{ left: `${XCoordinate}%` }}
        />
      ))}
    </>
  );
};
