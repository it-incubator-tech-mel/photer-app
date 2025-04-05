'use client';
import { useState, useCallback, useEffect } from 'react';

import Cropper from 'react-easy-crop';
import { Modal } from '@/widgets/modal/Modal';
import { Button, IconSprite } from '@/shared/ui';
import { RootState, useAppDispatch } from '@/shared/state/store';
import { useSelector } from 'react-redux';
import { goToStep, setCroppedImage } from '@/shared/state/slices/postSlice';
import { getCroppedImg } from '@/shared/lib/image-utils';

import { CroppingModalHeader } from './CroppingModalHeader';
import { CroppingModalSettings } from './CroppingModalSettings';
import { cn } from '@/shared/lib/cn';
import { aspectRatios } from '@/shared/config/aspectRatios';
import { ThumbnailsPreview } from './ThumbnailsPreview';

type CroppingModalProps = {
  photos: string[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function CroppingModal({
  photos,
}: CroppingModalProps): React.ReactElement {
  const dispatch = useAppDispatch();

  const { cropRatio } = useSelector((state: RootState) => state.post);

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [naturalAspect, setNaturalAspect] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );
  const [croppedViewSettings, setCroppedViewSettings] = useState({
    zoom: false,
    rotation: false,
    ratio: false,
    thumbnails: false,
  });

  const getImageAspectRatio = useCallback(() => {
    const img = new Image();
    img.src = photos[currentIndex];
    img.onload = (): void => {
      setNaturalAspect(img.naturalWidth / img.naturalHeight);
    };
  }, [photos, currentIndex]);

  useEffect(() => {
    getImageAspectRatio();
  }, [getImageAspectRatio]);

  const onCropComplete = useCallback(
    (_: unknown, croppedAreaPixels: PixelCrop) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleNext = useCallback(async () => {
    if (!croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage = await getCroppedImg(
        photos[0],
        croppedAreaPixels,
        rotation
      );
      dispatch(setCroppedImage(croppedImage));
      dispatch(goToStep('filters'));
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  }, [croppedAreaPixels, rotation, photos, dispatch]);
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
            image={photos[currentIndex]}
            key={`cropper-${photos[currentIndex]}`}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            aspect={
              aspectRatios.find((ratio) => ratio.label === cropRatio)?.value ||
              naturalAspect
            }
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
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
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
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, photos.length - 1)
                  )
                }
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
            zoom={zoom}
            rotation={rotation}
            croppedViewSettings={croppedViewSettings}
            aspectRatios={aspectRatios.map((ratio) =>
              ratio.label === 'Original'
                ? { ...ratio, value: naturalAspect }
                : ratio
            )}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onToggleSetting={handleToggleSetting}
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
                  photos={photos}
                  currentIndex={currentIndex}
                  onSelect={setCurrentIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
