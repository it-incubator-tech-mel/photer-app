import { RootState, useAppDispatch } from '@/shared/state/store';
import { Button, IconSprite } from '@/shared/ui';
import { Card } from '@/widgets/card/card';
import { Modal } from '@/widgets/modal/Modal';
import { useSelector } from 'react-redux';
import { goToStep, setPhotos } from '@/shared/state/slices/postSlice';
import { CroppingModal } from './CroppingModal/CroppingModal';

export function PostCreationModal(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { isModalOpen, currentStep, photos } = useSelector(
    (state: RootState) => state.post
  );
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;
    if (files) {
      const fileUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      dispatch(setPhotos(fileUrls));
      dispatch(goToStep('crop'));
    }
  };
  return (
    <>
      {currentStep === 'upload' && (
        <Modal title="Add Photo" size="sm" open={isModalOpen}>
          <div className="flex flex-col items-center gap-4">
            <Card className="flex min-h-[220px] min-w-[220px] items-center justify-center">
              <IconSprite iconName={'image-outline'} width={48} height={48} />
            </Card>
            <Button asChild className="w-[220px]">
              <label>
                Select from computer
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </Button>
            <Button className="w-[220px]" variant="outlined">
              Open Draft
            </Button>
          </div>
        </Modal>
      )}

      {currentStep === 'crop' && photos.length > 0 && (
        <CroppingModal photos={photos} handleFileChange={handleFileChange} />
      )}
    </>
  );
}
