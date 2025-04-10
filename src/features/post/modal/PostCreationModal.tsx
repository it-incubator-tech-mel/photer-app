import { RootState, useAppDispatch } from '@/shared/state/store';
import { useSelector } from 'react-redux';
import { addPhotos } from '@/shared/state/slices/postSlice';
import { CroppingModal } from './CroppingModal/CroppingModal';
import { FiltersModal } from './FiltersModal/FiltersModal';
import { DescriptionModal } from './DescriptionModal/DescriptionModal';
import { PhotoData, PostUploadModal } from './UploadModal/PostUploadModal';

export function PostCreationModal(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { isModalOpen, currentStep, photos } = useSelector(
    (state: RootState) => state.post
  );

  const handlePhotosAdded = (newPhotos: PhotoData[]): void => {
    dispatch(addPhotos(newPhotos));
  };

  return (
    <>
      {currentStep === 'upload' && (
        <PostUploadModal
          onPhotosAdded={handlePhotosAdded}
          isOpen={isModalOpen}
        />
      )}

      {currentStep === 'crop' && photos.length > 0 && <CroppingModal />}
      {currentStep === 'filters' && photos.length > 0 && <FiltersModal />}
      {currentStep === 'description' && photos.length > 0 && (
        <DescriptionModal />
      )}
    </>
  );
}
