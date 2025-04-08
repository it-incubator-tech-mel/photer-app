'use client';

import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/shared/state/store';
import {
  type PhotoSettings,
  setPhotoSettings,
} from '@/shared/state/slices/postSlice';
import type { PixelCrop } from '@/shared/config/aspectRatios';

export const useImageCropping = (
  currentPhoto: PhotoSettings
): {
  onCropComplete: (_: unknown, croppedAreaPixels: PixelCrop) => void;
  handleCropChange: (crop: { x: number; y: number }) => void;
  croppedAreaPixels: PixelCrop | null;
} => {
  const dispatch = useAppDispatch();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );

  const onCropComplete = useCallback(
    (_: unknown, croppedAreaPixels: PixelCrop) => {
      setCroppedAreaPixels(croppedAreaPixels);
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

  const handleCropChange = useCallback(
    (crop: { x: number; y: number }) => {
      dispatch(setPhotoSettings({ ...currentPhoto, crop }));
    },
    [dispatch, currentPhoto]
  );

  return {
    onCropComplete,
    handleCropChange,
    croppedAreaPixels,
  };
};
