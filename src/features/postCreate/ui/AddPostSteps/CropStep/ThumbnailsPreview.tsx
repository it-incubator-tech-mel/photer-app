'use client';

import { useThumbnailPreview } from '@/features/postCreate/hooks/useThumbnailPreview';
import { setCurrentPhotoIndex } from '@/features/postCreate/model/postSlice';
import { useAppDispatch } from '@/shared/state/store';
import { Button, IconSprite } from '@/shared/ui';

type ThumbnailsPreviewProps = {
  photos: string[];
  currentIndex: number;
};

export function ThumbnailsPreview({
  photos,
  currentIndex,
}: ThumbnailsPreviewProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const {
    handleFileChange,
    handleNext,
    handlePrev,
    onDeletePhoto,
    visiblePhotos,
  } = useThumbnailPreview(photos, currentIndex);
  return (
    <div className="bg-dark-500/80 absolute right-0 bottom-10 max-w-[244px] min-w-[152px] rounded-xs border-0 p-3">
      <div className="flex items-center justify-between gap-2">
        {visiblePhotos.map((photo, index) => {
          const photoIndex =
            currentIndex === 0
              ? index
              : currentIndex === photos.length - 1
                ? currentIndex - 1 + index
                : currentIndex + index;
          return (
            <div key={photoIndex} className="relative">
              <button
                onClick={() => dispatch(setCurrentPhotoIndex(photoIndex))}
                className={`h-20 w-20 p-0 ${currentIndex === photoIndex ? 'ring-2 ring-blue-500' : ''}`}
              >
                <img
                  src={photo}
                  alt={`Preview ${photoIndex}`}
                  className="h-20 w-20 object-cover"
                />
              </button>
              <button
                onClick={() => onDeletePhoto(photoIndex)}
                className="bg-dark-500/80 absolute top-1 right-1 h-4 w-4 rounded-full p-0"
              >
                <IconSprite iconName="close" width={16} height={16} />
              </button>
            </div>
          );
        })}
        <div className="flex flex-col items-center gap-2">
          <Button asChild variant="text" className="w-0 cursor-pointer p-3">
            <label htmlFor="file-input">
              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <IconSprite
                iconName={'plus-circle-outline'}
                width={24}
                height={24}
              />
            </label>
          </Button>
          {photos.length > 2 && (
            <div className="flex items-center gap-2">
              <Button
                variant="text"
                className="w-0 cursor-pointer p-2"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <IconSprite
                  iconName={'arrow-ios-back'}
                  width={24}
                  height={24}
                />
              </Button>
              <Button
                variant="text"
                className="w-0 cursor-pointer p-2"
                onClick={handleNext}
                disabled={currentIndex >= photos.length - 1}
              >
                <IconSprite
                  iconName={'arrow-ios-forward'}
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
