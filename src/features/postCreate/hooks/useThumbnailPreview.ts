import { useAppDispatch } from '@/shared/state/store';
import { toast } from 'react-toastify';
import {
  addPhotos,
  deletePhoto,
  setCurrentPhotoIndex,
} from '../model/postSlice';

type UseThumbnailPreviewReturn = {
  visiblePhotos: string[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrev: () => void;
  handleNext: () => void;
  onDeletePhoto: (index: number) => void;
};

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const useThumbnailPreview = (
  photos: string[],
  currentIndex: number
): UseThumbnailPreviewReturn => {
  const dispatch = useAppDispatch();
  // Определяем видимые фотографии на основе currentIndex
  const visiblePhotos = [];

  if (currentIndex === 0) {
    // Если первая фотография, показываем ее и следующую
    visiblePhotos.push(photos[0]);
    if (photos.length > 1) {
      visiblePhotos.push(photos[1]);
    }
  } else if (currentIndex === photos.length - 1) {
    // Если последняя фотография, показываем предыдущую и ее
    visiblePhotos.push(photos[currentIndex - 1]);
    visiblePhotos.push(photos[currentIndex]);
  } else {
    // Иначе показываем текущую и следующую
    visiblePhotos.push(photos[currentIndex]);
    visiblePhotos.push(photos[currentIndex + 1]);
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;
    const input = event.currentTarget;
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

  const handlePrev = (): void => {
    dispatch(setCurrentPhotoIndex(Math.max(0, currentIndex - 1)));
  };

  const handleNext = (): void => {
    dispatch(
      setCurrentPhotoIndex(Math.min(currentIndex + 1, photos.length - 1))
    );
  };

  const onDeletePhoto = (index: number): void => {
    URL.revokeObjectURL(photos[index]);
    dispatch(deletePhoto(index));
    if (index === currentIndex) {
      dispatch(setCurrentPhotoIndex(Math.max(0, currentIndex - 1)));
    }
  };

  return {
    visiblePhotos,
    handleFileChange,
    handlePrev,
    handleNext,
    onDeletePhoto,
  };
};
