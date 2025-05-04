import { RootState, useAppDispatch } from '@/shared/state/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { goToStep, PhotoSettings, setPhotoSettings } from '../model/postSlice';
import { usePhotoNavigation } from './usePhotoNavigation';
import { useFilterSave } from './useFilterSave';

type UseFiltersStepResult = {
  currentPhoto: PhotoSettings;
  selectedFilter: string;
  handleFilterChange: (filterName: string) => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  goNext: () => void;
  goPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
};

export const useFiltersStep = (onClose: () => void): UseFiltersStepResult => {
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
    dispatch(setPhotoSettings({ filter: filterName }));
  };

  const handleNext = async (): Promise<void> => {
    await handleSaveWithFilter(selectedFilter);
  };

  const handleBack = (): void => {
    console.log('Returning to crop step...');
    console.log('Original URL:', currentPhoto.originalUrl);
    console.log('Current URL:', currentPhoto.url);

    dispatch(
      setPhotoSettings({
        filter: 'Оригинал',
        url: currentPhoto.originalUrl ?? currentPhoto.url,
      })
    );
    dispatch(goToStep('crop'));
  };

  return {
    currentPhoto,
    selectedFilter,
    handleFilterChange,
    handleNext,
    handleBack,
    goNext,
    goPrev,
    hasNext,
    hasPrev,
  };
};
