import { CropStep } from './CropStep/CropStep';
import { DescriptionStep } from './DescriptionStep/DescriptionStep';
import { FiltersStep } from './FiltersStep/FiltersStep';
import { UploadStep } from './UploadStep/UploadStep';

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
