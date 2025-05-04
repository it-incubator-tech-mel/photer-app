'use client';
import { StepRenderer } from './StepRenderer';
import { ExitConfirmation } from './ExitConfirmation';
import { usePostCreationWizard } from '@/features/post/hooks/usePostCreationWizard';

export function PostCreationWizard(): React.ReactElement | null {
  const {
    currentStep,
    showExitConfirm,
    handleCloseModal,
    handleConfirmExit,
    handleCancelExit,
  } = usePostCreationWizard();

  return (
    <>
      <StepRenderer step={currentStep} onClose={handleCloseModal} />
      <ExitConfirmation
        open={showExitConfirm}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </>
  );
}
