'use client';

import type React from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { Button, IconSprite, Textarea } from '@/shared/ui';
import { type RootState, useAppDispatch } from '@/shared/state/store';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { PhotoNavigation } from '../../ui/PhotoNavigation';
import { useCreatePostMutation } from '../../api/postsApi';
import { closeModal } from '@/shared/state/slices/modalSlice';
import { goToStep, resetState } from '../../model/postSlice';
import { usePhotoNavigation } from '../../hooks/usePhotoNavigation';

const MAX_DESCRIPTION_LENGTH = 500;

type FormData = {
  description: string;
};

type DescriptionStepProps = {
  onClose: () => void;
};

export function DescriptionStep({
  onClose,
}: DescriptionStepProps): React.ReactElement {
  const [createPost] = useCreatePostMutation();
  const dispatch = useAppDispatch();
  const description = useSelector((state: RootState) => state.post.description);
  const photos = useSelector((state: RootState) => state.post.photos);
  const currentIndex = useSelector(
    (state: RootState) => state.post.currentPhotoIndex
  );

  const { hasNext, hasPrev, goNext, goPrev } = usePhotoNavigation();
  const currentPhoto = photos[currentIndex];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      description: description || '',
    },
    mode: 'onChange',
  });

  const descriptionValue = watch('description');
  const characterCount = descriptionValue.length;
  const isDescriptionValid = characterCount <= MAX_DESCRIPTION_LENGTH;

  const handleBack = (): void => {
    dispatch(goToStep('filters'));
  };

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      const formData = new FormData();

      // Проверяем, есть ли фотографии для загрузки
      if (photos.length === 0) {
        console.error('No photos to upload');
        return;
      }

      // Добавляем каждую фотографию как отдельное поле 'photo'
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        try {
          const response = await fetch(photo.url);
          const blob = await response.blob();

          // Создаем уникальное имя файла с использованием временной метки
          const timestamp = new Date().getTime();
          const filename = `photo_${timestamp}_${i}.jpg`;

          // Создаем File объект с уникальным именем
          const file = new File([blob], filename, {
            type: blob.type || 'image/jpeg',
          });

          formData.append('photos', file);
        } catch (error) {
          console.error(`Error fetching photo ${i}:`, error);
        }
      }

      // Добавляем описание
      formData.append('description', data.description);

      // Отладка - выводим содержимое FormData
      console.log('FormData содержит:');
      for (const pair of formData.entries()) {
        console.log(pair[0], ':', pair[1]);

        // Если это файл, выводим дополнительную информацию
        if (pair[1] instanceof Blob) {
          console.log('Тип файла:', pair[1].type);
          console.log('Размер файла:', pair[1].size, 'байт');
        }
      }

      await createPost(formData).unwrap();
      dispatch(resetState());
      dispatch(closeModal());
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <Modal
      onClose={onClose}
      headerContent={
        <div className="flex w-full items-center justify-between">
          <Button
            variant="text"
            className="w-0 cursor-pointer"
            onClick={handleBack}
          >
            <IconSprite iconName={'arrow-ios-back'} width={24} height={24} />
          </Button>
          <h2 className="text-xl font-semibold">Publication</h2>
          <Button
            variant="text"
            className="text-accent-500"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || !isDescriptionValid}
          >
            Next
          </Button>
        </div>
      }
      size="md"
      open={true}
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="relative flex h-[400px] w-full items-center justify-center rounded-lg bg-black">
          <img
            src={currentPhoto.url || '/placeholder.svg'}
            alt="Preview"
            className={`max-h-full max-w-full object-contain`}
          />
          <PhotoNavigation
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={goPrev}
            onNext={goNext}
          />
        </div>

        <div className="relative">
          <Textarea
            {...register('description', {
              required: 'Description is required',
              maxLength: {
                value: MAX_DESCRIPTION_LENGTH,
                message: `Maximum ${MAX_DESCRIPTION_LENGTH} characters allowed`,
              },
              validate: (value) =>
                value.trim().length > 0 || 'Description cannot be empty',
            })}
            label="Add publication descriptions"
            placeholder="Add a description to your post..."
            className="min-h-[120px] w-full resize-none"
            errorMessage={errors.description?.message}
          />

          <span
            className={`regular-text-14 absolute right-0 -bottom-3 ${
              !isDescriptionValid ? 'bottom-1 text-red-500' : 'text-light-900'
            }`}
          >
            {characterCount}/{MAX_DESCRIPTION_LENGTH}
          </span>
        </div>
      </form>
    </Modal>
  );
}
