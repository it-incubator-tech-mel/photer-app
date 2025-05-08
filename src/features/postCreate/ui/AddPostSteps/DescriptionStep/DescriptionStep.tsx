'use client';
import React from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { PhotoPreviewTextArea } from './PhotoPreviewTextArea';
import { PhotoPreviewWithNav } from '@/features/postCreate/ui/PhotoPreviewWithNav';
import { usePhotoNavigation } from '../../../hooks/usePhotoNavigation';
import { usePostDescription } from '../../../hooks/usePostDescription';
import { AddPostModalHeader } from '@/features/postCreate/ui/AddPostModalHeader';

const MAX_DESCRIPTION_LENGTH = 500;

export function DescriptionStep({
  onCloseAction,
}: {
  onCloseAction: () => void;
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
  } = usePostDescription(onCloseAction);

  const { hasNext, hasPrev, goNext, goPrev } = usePhotoNavigation();

  return (
    <Modal
      onClose={onCloseAction}
      headerContent={
        <AddPostModalHeader
          onBack={handleBack}
          onNext={handleSubmit(onSubmit)}
          disabled={!isValid || !isDescriptionValid}
          title="Publication"
        />
      }
      size="md"
      open
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <PhotoPreviewWithNav
          url={currentPhoto?.url}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={goPrev}
          onNext={goNext}
        />

        <PhotoPreviewTextArea
          register={register}
          errorMessage={errors.description?.message}
          characterCount={characterCount}
          maxLength={MAX_DESCRIPTION_LENGTH}
          isValid={isDescriptionValid}
        />
      </form>
    </Modal>
  );
}
