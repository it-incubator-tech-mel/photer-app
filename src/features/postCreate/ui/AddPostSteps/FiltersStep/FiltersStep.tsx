'use client';

import type React from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { AddPostModalHeader } from '@/features/postCreate/ui/AddPostModalHeader';
import { useFiltersStep } from '@/features/postCreate/hooks/useFiltersStep';
import { FiltersGrid } from './FiltersGrid';
import { filters } from './filters';
import { PhotoPreviewWithNav } from '@/features/postCreate/ui/PhotoPreviewWithNav';

export function FiltersStep({
  onCloseAction,
}: {
  onCloseAction: () => void;
}): React.ReactElement {
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
