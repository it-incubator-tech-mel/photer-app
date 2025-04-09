'use client';

import { useCallback } from 'react';
import { RootState, useAppDispatch } from '@/shared/state/store';
import {
  type PhotoSettings,
  setPhotoSettings,
  goToStep,
} from '@/shared/state/slices/postSlice';
import { useSelector } from 'react-redux';

export const useFilterSave = (
  currentPhoto: PhotoSettings
): {
  handleSaveWithFilter: (filterName: string) => void;
} => {
  const dispatch = useAppDispatch();
  const photos = useSelector((state: RootState) => state.post.photos);

  const applyFilterToImage = useCallback(
    async (filterName: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Важно для работы с изображениями из разных источников

        img.onload = (): void => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Не удалось получить контекст canvas'));
            return;
          }

          // Устанавливаем размеры canvas равными размерам изображения
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          // Рисуем изображение на canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Применяем фильтры в зависимости от выбранного
          switch (filterName) {
            case 'Монохром':
              applyGrayscaleFilter(ctx, canvas.width, canvas.height);
              break;
            case 'Сепия':
              applySepiaFilter(ctx, canvas.width, canvas.height);
              break;
            case 'Контраст':
              applyContrastFilter(ctx, canvas.width, canvas.height, 1.25);
              break;
            case 'Яркость':
              applyBrightnessFilter(ctx, canvas.width, canvas.height, 1.25);
              break;
            case 'Насыщенность':
              applySaturationFilter(ctx, canvas.width, canvas.height, 1.5);
              break;
            case 'Оригинал':
            default:
              // Ничего не делаем для оригинала
              break;
          }

          // Получаем данные изображения с canvas
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Не удалось создать blob из canvas'));
                return;
              }

              const url = URL.createObjectURL(blob);
              resolve(url);
            },
            'image/jpeg',
            0.95
          );
        };

        img.onerror = (): void => {
          reject(new Error('Ошибка загрузки изображения'));
        };

        img.src = currentPhoto.url;
      });
    },
    [currentPhoto.url]
  );

  // Функции для применения различных фильтров
  const applyGrayscaleFilter = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // R
      data[i + 1] = avg; // G
      data[i + 2] = avg; // B
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const applySepiaFilter = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189); // R
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168); // G
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131); // B
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const applyContrastFilter = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    factor: number
  ): void => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const factor2 = (259 * (factor * 100 + 255)) / (255 * (259 - factor * 100));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, factor2 * (data[i] - 128) + 128));
      data[i + 1] = Math.min(
        255,
        Math.max(0, factor2 * (data[i + 1] - 128) + 128)
      );
      data[i + 2] = Math.min(
        255,
        Math.max(0, factor2 * (data[i + 2] - 128) + 128)
      );
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const applyBrightnessFilter = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    factor: number
  ): void => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * factor);
      data[i + 1] = Math.min(255, data[i + 1] * factor);
      data[i + 2] = Math.min(255, data[i + 2] * factor);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const applySaturationFilter = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    factor: number
  ): void => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Преобразуем RGB в HSL
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        // Увеличиваем насыщенность
        const newS = Math.min(1, s * factor);

        // Преобразуем обратно в RGB
        const q = l < 0.5 ? l * (1 + newS) : l + newS - l * newS;
        const p = 2 * l - q;

        // Функция для преобразования hue в RGB
        const hueToRgb = (p: number, q: number, t: number): number => {
          if (t < 0) {
            t += 1;
          }
          if (t > 1) {
            t -= 1;
          }
          if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
          }
          if (t < 1 / 2) {
            return q;
          }
          if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
          }
          return p;
        };

        // Вычисляем hue
        let h;
        if (max === r) {
          h = (g - b) / d + (g < b ? 6 : 0);
        } else if (max === g) {
          h = (b - r) / d + 2;
        } else {
          h = (r - g) / d + 4;
        }
        h /= 6;

        // Преобразуем HSL обратно в RGB
        data[i] = hueToRgb(p, q, h + 1 / 3) * 255;
        data[i + 1] = hueToRgb(p, q, h) * 255;
        data[i + 2] = hueToRgb(p, q, h - 1 / 3) * 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleSaveWithFilter = useCallback(
    async (filterName: string) => {
      try {
        console.log(photos);

        // Применяем фильтр к изображению
        const filteredImageUrl = await applyFilterToImage(filterName);
        // Обновляем URL изображения в состоянии
        dispatch(
          setPhotoSettings({
            url: filteredImageUrl,
            filter: filterName,
          })
        );
        // Переходим к следующему шагу
        dispatch(goToStep('description'));
      } catch (error) {
        console.error('Ошибка при сохранении изображения с фильтром:', error);
      }
    },
    [applyFilterToImage, dispatch]
  );

  return {
    handleSaveWithFilter,
  };
};
