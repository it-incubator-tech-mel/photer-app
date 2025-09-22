import { Button, IconSprite } from '@/shared/ui';
import React from 'react';

export function AddPostModalHeader({
  onBack,
  onNext,
  disabled,
  title,
  text = 'Next',
  onClose,
}: {
  onBack: () => void;
  onNext: () => void;
  disabled: boolean;
  title: string;
  text?: string;
  onClose?: () => void;
}): React.ReactElement {
  return (
    <div className="flex w-full items-center justify-between">
      <Button variant="text" className="w-0 cursor-pointer" onClick={onBack}>
        <IconSprite iconName="arrow-ios-back" width={24} height={24} />
      </Button>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-3">
        <Button
          variant="text"
          className="text-accent-500"
          onClick={onNext}
          disabled={disabled}
        >
          {text}
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
