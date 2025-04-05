'use client';

import { goToStep } from '@/shared/state/slices/postSlice';
import { useAppDispatch } from '@/shared/state/store';
import { Button, IconSprite } from '@/shared/ui';
import React from 'react';

export function CroppingModalHeader({
  handleNext,
}: {
  handleNext: () => void;
}): React.ReactElement {
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-full items-center justify-between">
      <Button
        variant="text"
        className="w-0 cursor-pointer"
        onClick={() => dispatch(goToStep('upload'))}
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
