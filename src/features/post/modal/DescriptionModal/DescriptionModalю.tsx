'use client';

import type React from 'react';
import { useState } from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { Button, IconSprite, Textarea } from '@/shared/ui';
import { type RootState, useAppDispatch } from '@/shared/state/store';
import { useSelector } from 'react-redux';
import { goToStep } from '@/shared/state/slices/postSlice';

export function DescriptionModal(): React.ReactElement {
  const dispatch = useAppDispatch();
  const description = useSelector((state: RootState) => state.post.description);
  const [localDescription, setLocalDescription] = useState(description || '');
  const photos = useSelector((state: RootState) => state.post.photos);
  const currentIndex = useSelector(
    (state: RootState) => state.post.currentPhotoIndex
  );
  const currentPhoto = photos[currentIndex];
  const handleBack = (): void => {
    dispatch(goToStep('filters'));
  };

  const handleNext = (): void => {
    dispatch(goToStep('crop')); // Или следующий шаг вашего процесса
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setLocalDescription(e.target.value);
  };

  return (
    <Modal
      headerContent={
        <div className="flex w-full items-center justify-between">
          <Button
            variant="text"
            className="w-0 cursor-pointer"
            onClick={handleBack}
          >
            <IconSprite iconName={'arrow-ios-back'} width={24} height={24} />
          </Button>
          <h2 className="text-xl font-semibold">Описание</h2>
          <Button
            variant="text"
            className="text-accent-500"
            onClick={handleNext}
            disabled={!localDescription.trim()}
          >
            Далее
          </Button>
        </div>
      }
      size="md"
      open={true}
      showCloseButton={false}
    >
      <div className="flex flex-col gap-4 p-4">
        <div>
          {photos.length > 0 && (
            <img
              src={currentPhoto.url}
              alt="Uploaded"
              className="w-full rounded-lg"
            />
          )}
        </div>
        <Textarea
          value={localDescription}
          onChange={handleChange}
          placeholder="Добавьте описание к вашему посту..."
          className="min-h-[200px] w-full resize-none rounded-lg border p-3"
        />

        <div className="text-sm text-gray-500">
          <p>Советы для хорошего описания:</p>
          <ul className="list-disc pl-5">
            <li>Опишите что изображено на фото</li>
            <li>Добавьте интересные детали</li>
            <li>Используйте хэштеги для поиска</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
