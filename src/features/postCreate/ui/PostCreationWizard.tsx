// 'use client';

// import { usePostCreationWizard } from '../hooks/usePostCreationWizard';
// import { ExitConfirmation } from './ExitConfirmation';
// import { StepRenderer } from './StepRenderer';

// type Props = {
//   exitSubscriberAction: () => void;
// };

// export function PostCreationWizard({
//   exitSubscriberAction,
// }: Props): React.ReactElement | null {
//   const {
//     currentStep,
//     showExitConfirm,
//     handleCloseModal,
//     handleConfirmExit,
//     handleCancelExit,
//   } = usePostCreationWizard(exitSubscriberAction);

//   return (
//     <>
//       <StepRenderer step={currentStep} onClose={handleCloseModal} />
//       <ExitConfirmation
//         open={showExitConfirm}
//         onConfirm={handleConfirmExit}
//         onCancel={handleCancelExit}
//       />
//     </>
//   );
// }
//////////////////////////
'use client';

import { useRouter } from 'next/navigation';
import { usePostCreationWizard } from '../hooks/usePostCreationWizard';
import { ExitConfirmation } from './ExitConfirmation';
import { StepRenderer } from './StepRenderer';

export function PostCreationWizard(): React.ReactElement | null {
  const router = useRouter();

  const {
    currentStep,
    showExitConfirm,
    handleCloseModal,
    handleConfirmExit,
    handleCancelExit,
  } = usePostCreationWizard(() => router.back()); // ✅ функция создаётся внутри клиента

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
