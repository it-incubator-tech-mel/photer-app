'use client';

import { usePostCreationWizard } from '../hooks/usePostCreationWizard';
import { ExitConfirmation } from './ExitConfirmation';
import { StepRenderer } from './StepRenderer';

type Props = {
  exitSubscriberAction: () => void;
};

export function PostCreationWizard({
  exitSubscriberAction,
}: Props): React.ReactElement | null {
  const {
    currentStep,
    showExitConfirm,
    handleCloseModal,
    handleConfirmExit,
    handleCancelExit,
  } = usePostCreationWizard(exitSubscriberAction);

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
