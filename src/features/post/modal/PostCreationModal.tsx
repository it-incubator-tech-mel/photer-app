import { RootState, useAppDispatch } from '@/shared/state/store';
import { Button, IconSprite } from '@/shared/ui';
import { Card } from '@/widgets/card/card';
import { Modal } from '@/widgets/modal/Modal';
import { useSelector } from 'react-redux';
import { addPhotos } from '@/shared/state/slices/postSlice';
import { CroppingModal } from './CroppingModal/CroppingModal';
import { FiltersModal } from './filters-modal';

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
      const newPhotosPromises = Array.from(files).map((file) => {
        return new Promise<{
          url: string;
          crop: { x: number; y: number };
          zoom: number;
          rotation: number;
          croppedAreaPixels: null;
          naturalAspect: number;
          originalWidth: number;
          originalHeight: number;
        }>((resolve) => {
          const url = URL.createObjectURL(file);
          const img = new Image();

          img.onload = (): void => {
            resolve({
              url,
              crop: { x: 0, y: 0 },
              zoom: 1,
              rotation: 0,
              croppedAreaPixels: null,
              naturalAspect: img.naturalWidth / img.naturalHeight,
              originalWidth: img.naturalWidth,
              originalHeight: img.naturalHeight,
            });
          };

          img.onerror = (): void => {
            // В случае ошибки загрузки изображения
            resolve({
              url,
              crop: { x: 0, y: 0 },
              zoom: 1,
              rotation: 0,
              croppedAreaPixels: null,
              naturalAspect: 1,
              originalWidth: 100,
              originalHeight: 100,
            });
          };

          img.src = url;
        });
      });

      Promise.all(newPhotosPromises).then((newPhotos) => {
        dispatch(addPhotos(newPhotos));
      });
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

      {currentStep === 'crop' && photos.length > 0 && <CroppingModal />}
      {currentStep === 'filters' && photos.length > 0 && <FiltersModal />}
    </>
  );
}
