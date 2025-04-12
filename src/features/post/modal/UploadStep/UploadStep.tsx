import { addPhotos } from '@/shared/state/slices/postSlice';
import { useAppDispatch } from '@/shared/state/store';
import { Button, IconSprite } from '@/shared/ui';
import { Card } from '@/widgets/card/card';
import { Modal } from '@/widgets/modal/Modal';

import { ChangeEvent } from 'react';

import { toast } from 'react-toastify';

export type PhotoData = {
  url: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  croppedAreaPixels: null;
  naturalAspect: number;
  originalWidth: number;
  originalHeight: number;
};

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export function UploadStep({
  onClose,
}: {
  onClose: () => void;
}): React.ReactElement {
  const dispatch = useAppDispatch();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.currentTarget;
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > MAX_FILE_SIZE_BYTES
    );
    if (oversizedFiles.length > 0) {
      toast.error(`The photo must be less than ${MAX_FILE_SIZE_MB}
Mb and have JPEG or PNG
format`);
      input.value = '';
      return;
    }

    const newPhotosPromises = Array.from(files).map((file) => {
      return new Promise<PhotoData>((resolve) => {
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
  };

  return (
    <Modal open onClose={onClose}>
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
  );
}
