// src/entities/post/ui/SkeletonCard.tsx
'use client';

import { ReactElement } from 'react';

export const SkeletonCard = (): ReactElement => {
  return (
    <div
      className="bg-dark-500 flex w-[234px] animate-pulse flex-col overflow-hidden rounded-2xl"
      style={{ height: '391px' }}
    >
      {/* Фото */}
      <div className="bg-dark-300 h-[240px] w-full"></div>

      {/* Тексты */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div className="bg-dark-300 mb-2 h-4 w-3/4 rounded"></div>
        <div className="bg-dark-300 mb-2 h-3 w-1/2 rounded"></div>
        <div className="bg-dark-300 h-4 w-full rounded"></div>
      </div>
    </div>
  );
};
//////////
