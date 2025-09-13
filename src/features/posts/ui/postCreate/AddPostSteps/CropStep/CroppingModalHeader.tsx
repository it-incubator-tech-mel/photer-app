'use client';

import { CreationStep } from '@/features/posts/lib/post.types';
import { goToStep } from '@/features/posts/model/postSlice';
import { useAppDispatch } from '@/shared/state/store';
import { Button, IconSprite } from '@/shared/ui';
import React from 'react';

type CroppingModalHeaderProps = {
  stepToGo: CreationStep;
  stepToBack: CreationStep;
  onNext?: () => void;
  onClose?: () => void;
};

export function CroppingModalHeader({
  stepToGo,
  stepToBack,
  onNext,
  onClose,
}: CroppingModalHeaderProps): React.ReactElement {
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
      <div className="flex items-center gap-3">
        <Button onClick={handleNext} variant="text">
          Next
        </Button>
        {onClose && (
          <button
            onClick={onClose}
            className="hover:bg-dark-100 focus-visible:bg-dark-100 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 transition-all duration-100 focus-visible:outline-none"
          >
            <IconSprite iconName="close" />
          </button>
        )}
      </div>
    </div>
  );
}
