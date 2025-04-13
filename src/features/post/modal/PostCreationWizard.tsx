'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/shared/state/store';
import { UploadStep } from './UploadStep/UploadStep';
import { CropStep } from './CropStep/CropStep';
import { FiltersStep } from './FiltersStep/FiltersStep';
import { DescriptionStep } from './DescriptionStep/DescriptionStep';
import { ConfirmationDialog } from './ConfirmationDialog';
import { resetState } from '@/shared/state/slices/postSlice';
import { closeModal } from '@/shared/state/slices/modalSlice';

export function PostCreationWizard(): React.ReactElement | null {
  const { currentStep } = useSelector((state: RootState) => state.post);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = (): void => {
    dispatch(resetState());
    dispatch(closeModal());
    setShowExitConfirm(false);
  };

  const handleCancelExit = (): void => {
    setShowExitConfirm(false);
  };

  // Рендерим текущий шаг с пропсом onClose
  const renderStep = (): React.ReactElement | null => {
    switch (currentStep) {
      case 'upload':
        return <UploadStep onClose={handleCloseModal} />;
      case 'crop':
        return <CropStep onClose={handleCloseModal} />;
      case 'filters':
        return <FiltersStep onClose={handleCloseModal} />;
      case 'description':
        return <DescriptionStep onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderStep()}

      <ConfirmationDialog
        open={showExitConfirm}
        title="Close"
        message={`Do you really want to close the creation of a publication?
 If you close everything will be deleted`}
        confirmText="Discard"
        cancelText="Cancel"
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </>
  );
}
