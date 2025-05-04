import { UploadStep } from '@/features/post/modal/AddPostSteps/UploadStep/UploadStep';
import { CropStep } from '@/features/post/modal/AddPostSteps/CropStep/CropStep';
import { FiltersStep } from '@/features/post/modal/AddPostSteps/FiltersStep/FiltersStep';
import { DescriptionStep } from '@/features/post/modal/AddPostSteps/DescriptionStep/DescriptionStep';

type StepRendererProps = {
  step: string;
  onClose: () => void;
};

export function StepRenderer({
  step,
  onClose,
}: StepRendererProps): React.ReactElement | null {
  switch (step) {
    case 'upload':
      return <UploadStep onClose={onClose} />;
    case 'crop':
      return <CropStep onClose={onClose} />;
    case 'filters':
      return <FiltersStep onClose={onClose} />;
    case 'description':
      return <DescriptionStep onClose={onClose} />;
    default:
      return null;
  }
}
