'use client';

import type React from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { AddPostModalHeader } from '@/features/postCreate/ui/AddPostModalHeader';
import { useFiltersStep } from '@/features/postCreate/hooks/useFiltersStep';
import { FiltersGrid } from './FiltersGrid';
import { PhotoPreviewWithNav } from '@/features/postCreate/ui/PhotoPreviewWithNav';

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
        <AddPostModalHeader
          onBack={handleBack}
          onNext={handleNext}
          disabled={false}
          title="Filters"
        />
      }
      size="md"
      open={true}
      showCloseButton={false}
    >
      <div className="flex flex-col items-center">
        <PhotoPreviewWithNav
          url={currentPhoto.url}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={goPrev}
          onNext={goNext}
          filterClass={
            filters.find((f) => f.name === currentPhoto.filter)?.className ?? ''
          }
        />

        <FiltersGrid
          filters={filters}
          currentFilter={currentPhoto.filter || ''}
          currentPhotoUrl={currentPhoto.url}
          onFilterChange={handleFilterChange}
        />
      </div>
    </Modal>
  );
}
