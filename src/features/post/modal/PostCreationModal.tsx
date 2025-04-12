import { RootState } from '@/shared/state/store';
import { useSelector } from 'react-redux';
import { CroppingModal } from './CroppingModal/CroppingModal';
import { FiltersModal } from './FiltersModal/FiltersModal';
import { DescriptionModal } from './DescriptionModal/DescriptionModal';
import { PostUploadModal } from './UploadModal/PostUploadModal';

export function PostCreationModal(): React.ReactElement {
  const { currentStep, photos } = useSelector((state: RootState) => state.post);

  return (
    <>
      {currentStep === 'upload' && <PostUploadModal />}

      {currentStep === 'crop' && photos.length > 0 && <CroppingModal />}
      {currentStep === 'filters' && photos.length > 0 && <FiltersModal />}
      {currentStep === 'description' && photos.length > 0 && (
        <DescriptionModal />
      )}
    </>
  );
}
