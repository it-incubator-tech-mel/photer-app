'use client';
import { useState, useCallback, useEffect } from 'react';

import Cropper from 'react-easy-crop';
import { Modal } from '@/widgets/modal/Modal';
import { Button, IconSprite } from '@/shared/ui';
import { RootState, useAppDispatch } from '@/shared/state/store';
import { useSelector } from 'react-redux';
import {
  goToStep,
  setCurrentPhotoIndex,
  setPhotoSettings,
} from '@/shared/state/slices/postSlice';

import { CroppingModalHeader } from './CroppingModalHeader';
import { CroppingModalSettings } from './CroppingModalSettings';
import { cn } from '@/shared/lib/cn';
import { aspectRatios } from '@/shared/config/aspectRatios';
import { ThumbnailsPreview } from './ThumbnailsPreview';

export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function CroppingModal(): React.ReactElement {
  const dispatch = useAppDispatch();
  const photos = useSelector((state: RootState) => state.post.photos);
  const currentIndex = useSelector(
    (state: RootState) => state.post.currentPhotoIndex
  );
  const currentPhoto = photos[currentIndex];

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );
  const [croppedViewSettings, setCroppedViewSettings] = useState({
    zoom: false,
    rotation: false,
    ratio: false,
    thumbnails: false,
  });
  const setZoom = useCallback(
    (zoom: number): void => {
      dispatch(
        setPhotoSettings({
          ...currentPhoto,
          zoom,
        })
      );
    },
    [dispatch, currentPhoto]
  );

  const setRotation = useCallback(
    (rotation: number): void => {
      dispatch(
        setPhotoSettings({
          ...currentPhoto,
          rotation,
        })
      );
    },
    [dispatch, currentPhoto]
  );

  const getImageAspectRatio = useCallback(() => {
    const img = new Image();
    img.onerror = (): void => {
      console.error('Failed to load image for aspect ratio calculation');
      dispatch(
        setPhotoSettings({
          ...currentPhoto,
          naturalAspect: 1, // Дефолтное значение при ошибке
        })
      );
    };
    img.onload = (): void => {
      const aspect = img.naturalWidth / img.naturalHeight;
      dispatch(
        setPhotoSettings({
          ...currentPhoto,
          naturalAspect: aspect,
        })
      );
    };
    img.src = currentPhoto.url;
  }, [dispatch, currentPhoto]);

  useEffect(() => {
    if (!currentPhoto.naturalAspect) {
      getImageAspectRatio();
    }
  }, [getImageAspectRatio]);

  const onCropComplete = useCallback(
    (_: unknown, croppedAreaPixels: PixelCrop) => {
      setCroppedAreaPixels(croppedAreaPixels);
      // Сохраняем область кропа в Redux вместе с размерами
      dispatch(
        setPhotoSettings({
          croppedAreaPixels,
          croppedWidth: croppedAreaPixels.width,
          croppedHeight: croppedAreaPixels.height,
        })
      );
    },
    [dispatch]
  );
  // Добавьте эту функцию в ваш CroppingModal или в отдельный файл утилит
  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: PixelCrop,
    rotation = 0
  ): Promise<string> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.translate(pixelCrop.width / 2, pixelCrop.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-pixelCrop.width / 2, -pixelCrop.height / 2);

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas is empty');
        }
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  const handleNext = useCallback(async () => {
    if (!croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage = await getCroppedImg(
        currentPhoto.url,
        croppedAreaPixels,
        currentPhoto.rotation
      );
      dispatch(
        setPhotoSettings({
          url: croppedImage, // Обновляем URL на кропнутое изображение
          croppedAreaPixels,
          croppedWidth: croppedAreaPixels.width,
          croppedHeight: croppedAreaPixels.height,
        })
      );
      dispatch(goToStep('filters'));
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  }, [croppedAreaPixels, currentPhoto.rotation, currentPhoto.url, dispatch]);
  const handleToggleSetting = useCallback(
    (type: 'zoom' | 'rotation' | 'ratio' | 'addMore') => {
      setCroppedViewSettings((prev) => ({
        ...prev,
        zoom: type === 'zoom' ? !prev.zoom : false,
        rotation: type === 'rotation' ? !prev.rotation : false,
        ratio: type === 'ratio' ? !prev.ratio : false,
        thumbnails: type === 'addMore' ? !prev.thumbnails : false,
      }));
    },
    []
  );
  const handleCropChange = useCallback(
    (crop: { x: number; y: number }) => {
      dispatch(
        setPhotoSettings({
          ...currentPhoto,
          crop,
        })
      );
    },
    [dispatch, currentPhoto]
  );
  const handleCropRatioChange = useCallback(
    (ratio: string) => {
      const selectedRatio = aspectRatios.find((r) => r.label === ratio);

      dispatch(
        setPhotoSettings({
          cropRatio: ratio,
          ...(selectedRatio && {
            croppedWidth: selectedRatio.value * 100,
            croppedHeight: 100,
          }),
        })
      );
    },
    [dispatch]
  );
  // Определяем аспект для кроппера
  const getCropperAspect = useCallback(() => {
    if (!currentPhoto.cropRatio || currentPhoto.cropRatio === 'Original') {
      // Для Original используем естественное соотношение сторон изображения
      return currentPhoto.naturalAspect;
    }

    // Для других соотношений используем значение из конфигурации
    const selectedRatio = aspectRatios.find(
      (ratio) => ratio.label === currentPhoto.cropRatio
    );
    return selectedRatio?.value || currentPhoto.naturalAspect;
  }, [currentPhoto.cropRatio, currentPhoto.naturalAspect]);

  return (
    <Modal
      headerContent={<CroppingModalHeader handleNext={handleNext} />}
      size="md"
      open={true}
      showCloseButton={false}
    >
      <div className="flex flex-col items-center">
        <div className="relative h-[400px] w-full">
          <Cropper
            image={currentPhoto.url}
            key={`cropper-${currentPhoto.url}-${currentIndex}`}
            crop={currentPhoto.crop}
            zoom={currentPhoto.zoom}
            rotation={currentPhoto.rotation}
            onCropChange={handleCropChange}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            restrictPosition={true}
            aspect={getCropperAspect()}
            classes={{
              containerClassName: 'bg-black rounded-lg',
              mediaClassName: 'object-contain',
              cropAreaClassName: 'border-2 border-blue-500',
            }}
          />
          <div className="">
            {currentIndex > 0 && (
              <Button
                variant="text"
                className="bg-dark-500/80 absolute top-[50%] left-0 p-3"
                onClick={() => dispatch(setCurrentPhotoIndex(currentIndex - 1))}
              >
                <IconSprite
                  iconName={'arrow-ios-back'}
                  width={24}
                  height={24}
                />
              </Button>
            )}
            {photos.length > 1 && currentIndex < photos.length - 1 && (
              <Button
                className="bg-dark-500/80 absolute top-[50%] right-0 p-3"
                variant="text"
                onClick={() => dispatch(setCurrentPhotoIndex(currentIndex + 1))}
              >
                <IconSprite
                  iconName={'arrow-ios-forward'}
                  width={24}
                  height={24}
                />
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4 flex w-full max-w-md justify-between">
          <CroppingModalSettings
            zoom={currentPhoto.zoom}
            rotation={currentPhoto.rotation}
            croppedViewSettings={croppedViewSettings}
            aspectRatios={aspectRatios.map((ratio) =>
              ratio.label === 'Original'
                ? { ...ratio, value: currentPhoto.naturalAspect }
                : ratio
            )}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onToggleSetting={handleToggleSetting}
            onCropRatioChange={handleCropRatioChange}
            currentCropRatio={currentPhoto.cropRatio}
          />

          <div>
            <div className="relative">
              <Button
                variant="text"
                className={cn(
                  'bg-dark-500 group w-0 border-0 focus:border-0 active:border-0'
                )}
                onClick={() =>
                  setCroppedViewSettings((prev) => ({
                    ...prev,
                    ratio: false,
                    zoom: false,
                    rotation: false,
                    thumbnails: !prev.thumbnails,
                  }))
                }
              >
                <IconSprite
                  iconName={'image-outline'}
                  className={cn(
                    'fill-light-100 transition-colors duration-200',
                    {
                      'fill-accent-500': croppedViewSettings.thumbnails,
                    }
                  )}
                />
              </Button>

              {croppedViewSettings.thumbnails && (
                <ThumbnailsPreview
                  photos={photos.map((photo) => photo.url)}
                  currentIndex={currentIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
