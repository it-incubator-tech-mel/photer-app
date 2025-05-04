'use client';

import { useAppDispatch } from '@/shared/state/store';
import { Button, IconSprite } from '@/shared/ui';
import React from 'react';
import { CreationStep, goToStep } from '../../model/postSlice';

type CroppingModalHeader = {
  stepToGo: CreationStep;
  stepToBack: CreationStep;
  onNext?: () => void;
};

export function CroppingModalHeader({
  stepToGo,
  stepToBack,
  onNext,
}: CroppingModalHeader): React.ReactElement {
  const dispatch = useAppDispatch();
  const handleNext = (): void => {
    if (onNext) {
      onNext();
    } else {
      dispatch(goToStep(stepToGo));
    }
  };
  return (
    <div className="flex w-full items-center justify-between">
      <Button
        variant="text"
        className="w-0 cursor-pointer"
        onClick={() => dispatch(goToStep(stepToBack))}
      >
        <IconSprite iconName={'arrow-ios-back'} width={24} height={24} />
      </Button>
      <h2>Cropping</h2>
      <Button onClick={handleNext} variant="text">
        Next
      </Button>
    </div>
  );
}
