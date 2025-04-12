'use client';

import type React from 'react';

import { useState } from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { Button, IconSprite } from '@/shared/ui';
import { type RootState, useAppDispatch } from '@/shared/state/store';
import { useSelector } from 'react-redux';
import { goToStep, setPhotoSettings } from '@/shared/state/slices/postSlice';
import { usePhotoNavigation } from '../../hooks/usePhotoNavigation';
import { useFilterSave } from '../../hooks/useFilterSave';
import { PhotoNavigation } from '../../ui/PhotoNavigation';

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

export function FiltersStep(): React.ReactElement {
  const dispatch = useAppDispatch();
  const photos = useSelector((state: RootState) => state.post.photos);
  const currentIndex = useSelector(
    (state: RootState) => state.post.currentPhotoIndex
  );
  const currentPhoto = photos[currentIndex];

  const [selectedFilter, setSelectedFilter] = useState(
    currentPhoto.filter || 'Оригинал'
  );
  const { hasNext, hasPrev, goNext, goPrev } = usePhotoNavigation();
  const { handleSaveWithFilter } = useFilterSave(currentPhoto);

  const handleFilterChange = (filterName: string): void => {
    setSelectedFilter(filterName);
    dispatch(
      setPhotoSettings({
        filter: filterName,
      })
    );
  };

  const handleNext = async (): Promise<void> => {
    // Сначала применяем фильтр и ждем завершения
    await handleSaveWithFilter(selectedFilter);
  };

  const handleBack = (): void => {
    dispatch(goToStep('crop'));
  };

  return (
    <Modal
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
        <div className="relative flex h-[400px] w-full items-center justify-center rounded-lg bg-black">
          <img
            src={currentPhoto.url || '/placeholder.svg'}
            alt="Preview"
            className={`max-h-full max-w-full object-contain ${
              filters.find((f) => f.name === selectedFilter)?.className || ''
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
              <div
                key={filter.name}
                className="flex cursor-pointer flex-col items-center"
                onClick={() => {
                  handleFilterChange(filter.name);
                }}
              >
                <div
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 ${
                    selectedFilter === filter.name
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
