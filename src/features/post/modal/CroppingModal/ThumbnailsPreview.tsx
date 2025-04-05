'use client';

import { Button, IconSprite } from '@/shared/ui';
import { useState } from 'react';

type ThumbnailsPreviewProps = {
  photos: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
};

export function ThumbnailsPreview({
  photos,
  currentIndex,
  onSelect,
  onDelete,
}: ThumbnailsPreviewProps): React.ReactElement {
  const [startIndex, setStartIndex] = useState(0);
  const visiblePhotos = photos.slice(startIndex, startIndex + 2);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      // Handle file upload
    }
  };

  const handlePrev = (): void => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = (): void => {
    setStartIndex((prev) => Math.min(prev + 1, photos.length - 2));
  };
  return (
    <div className="bg-dark-500/80 absolute right-0 bottom-10 max-w-[244px] min-w-[152px] rounded-xs border-0 p-3">
      <div className="flex items-center justify-between gap-2">
        {visiblePhotos.map((photo, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => onSelect(startIndex + index)}
              className={`h-20 w-20 p-0 ${currentIndex === index ? 'ring-2 ring-blue-500' : ''}`}
            >
              <img
                src={photo}
                alt={`Preview ${index}`}
                className="h-20 w-20 object-cover"
              />
            </button>
            <button
              onClick={() => onDelete(index)}
              className="bg-dark-500/80 absolute top-1 right-1 h-4 w-4 rounded-full p-0"
            >
              <IconSprite iconName="close" width={16} height={16} />
            </button>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2">
          <Button asChild variant="text" className="w-0 cursor-pointer">
            <label htmlFor="file-input">
              <input type="file" accept="image/*" className="hidden" />
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
                className="w-0 cursor-pointer"
                onClick={handlePrev}
                disabled={startIndex === 0}
              >
                <IconSprite
                  iconName={'arrow-ios-back'}
                  width={24}
                  height={24}
                />
              </Button>
              <Button
                variant="text"
                className="w-0 cursor-pointer"
                onClick={handleNext}
                disabled={startIndex >= photos.length - 2}
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
