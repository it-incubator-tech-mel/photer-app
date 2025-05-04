'use client';
import React from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { Button, IconSprite, Textarea } from '@/shared/ui';
import { PhotoNavigation } from '../../../ui/PhotoNavigation';
import { usePhotoNavigation } from '../../../hooks/usePhotoNavigation';
import { usePostDescription } from '../../../hooks/usePostDescription';

const MAX_DESCRIPTION_LENGTH = 500;

export function DescriptionStep({
  onClose,
}: {
  onClose: () => void;
}): React.ReactElement {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    isDescriptionValid,
    characterCount,
    onSubmit,
    handleBack,
    currentPhoto,
  } = usePostDescription(onClose);

  const { hasNext, hasPrev, goNext, goPrev } = usePhotoNavigation();

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
            <IconSprite iconName="arrow-ios-back" width={24} height={24} />
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
      open
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="relative flex h-[400px] w-full items-center justify-center rounded-lg bg-black">
          <img
            src={currentPhoto?.url || '/placeholder.svg'}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
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
