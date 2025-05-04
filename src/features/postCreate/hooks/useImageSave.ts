import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/state/store';

import { PixelCrop } from '@/shared/config/aspectRatios';
import { goToStep, PhotoSettings, setPhotoSettings } from '../model/postSlice';

type useImageSaveReturn = {
  handleNext: (croppedAreaPixels: PixelCrop | null) => Promise<void>;
};

export const useImageSave = (
  currentPhoto: PhotoSettings
): useImageSaveReturn => {
  const dispatch = useAppDispatch();

  const handleNext = useCallback(
    async (croppedAreaPixels: PixelCrop | null) => {
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
            url: croppedImage,
            croppedAreaPixels,
            croppedWidth: croppedAreaPixels.width,
            croppedHeight: croppedAreaPixels.height,
          })
        );
        dispatch(goToStep('filters'));
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    },
    [currentPhoto.rotation, currentPhoto.url, dispatch]
  );

  return {
    handleNext,
  };
};

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
