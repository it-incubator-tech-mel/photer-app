'use client';

import type React from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { Button, IconSprite } from '@/shared/ui';
import { useFiltersStep } from '@/features/postCreate/hooks/useFiltersStep';
import { PhotoNavigation } from '@/features/postCreate/ui/PhotoNavigation';

type Filter = {
  name: string;
  className: string;
};

const filters: Filter[] = [
  { name: 'Оригинал', className: '' },
  { name: 'Монохром', className: 'grayscale' },
  { name: 'Сепия', className: 'sepia' },
  { name: 'Контраст', className: 'contrast-125' },
  { name: 'Яркость', className: 'brightness-125' },
  { name: 'Насыщенность', className: 'saturate-150' },
];

type FiltersStepProps = {
  onCloseAction: () => void;
};

export function FiltersStep({
  onCloseAction,
}: FiltersStepProps): React.ReactElement {
  const {
    currentPhoto,
    handleFilterChange,
    handleNext,
    handleBack,
    goNext,
    goPrev,
    hasNext,
    hasPrev,
  } = useFiltersStep(onCloseAction);

  return (
    <Modal
      onClose={onCloseAction}
      headerContent={
        <div className="flex w-full items-center justify-between">
          <Button
            variant="text"
            className="w-0 cursor-pointer"
            onClick={handleBack}
          >
            <IconSprite iconName={'arrow-ios-back'} width={24} height={24} />
          </Button>
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button
            variant="text"
            className="text-accent-500"
            onClick={async () => {
              handleNext();
            }}
          >
            Next
          </Button>
        </div>
      }
      size="md"
      open={true}
      showCloseButton={false}
    >
      <div className="flex flex-col items-center">
        <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg bg-black">
          <img
            src={currentPhoto.url || '/placeholder.svg'}
            alt="Preview"
            className={`max-h-full max-w-full object-contain ${
              filters.find((f) => f.name === currentPhoto.filter)?.className ||
              ''
            }`}
            style={{
              transform: `rotate(${currentPhoto.rotation}deg)`,
            }}
          />
          <PhotoNavigation
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={goPrev}
            onNext={goNext}
          />
        </div>

        <div className="mt-4 w-full">
          <div className="grid grid-cols-3 gap-4">
            {filters.map((filter) => (
              //  filtered images
              <div
                key={filter.name}
                className="flex cursor-pointer flex-col items-center"
                onClick={() => {
                  handleFilterChange(filter.name);
                }}
              >
                <div
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 ${
                    currentPhoto.filter === filter.name
                      ? 'border-accent-500'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={currentPhoto.url || '/placeholder.svg'}
                    alt={filter.name}
                    className={`h-full w-full object-cover ${filter.className}`}
                  />
                </div>
                <span className="text-light-100 mt-1 text-sm">
                  {filter.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
