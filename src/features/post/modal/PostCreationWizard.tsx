'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/state/store';
import { UploadStep } from './UploadStep/UploadStep';
import { CropStep } from './CropStep/CropStep';
import { FiltersStep } from './FiltersStep/FiltersStep';
import { DescriptionStep } from './DescriptionStep/DescriptionStep';

export function PostCreationWizard(): React.ReactElement | null {
  const { currentStep } = useSelector((state: RootState) => state.post);

  return (
    <>
      {currentStep === 'upload' && <UploadStep />}
      {currentStep === 'crop' && <CropStep />}
      {currentStep === 'filters' && <FiltersStep />}
      {currentStep === 'description' && <DescriptionStep />}
    </>
  );
}
