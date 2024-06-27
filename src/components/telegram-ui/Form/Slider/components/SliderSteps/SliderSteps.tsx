'use client';

import { classNames } from '@tma.js/sdk-react';

import { Step } from '../../hooks/types';
import styles from './SliderSteps.module.css';

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
            [styles['step--passed']]: isPassed
          })}
          style={{ left: `${XCoordinate}%` }}
        />
      ))}
    </>
  );
};
