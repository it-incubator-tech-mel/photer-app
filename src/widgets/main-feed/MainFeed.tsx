// src/widgets/main-feed/MainFeed.tsx
'use client';

import { Post } from '@/entities/post/model/types';
import Image from 'next/image';
import { ReactElement } from 'react';

type Props = {
  posts: Post[];
};

export const MainFeed = ({ posts }: Props): ReactElement => {
  if (!posts.length) {
    return <p className="text-light-900">Нет постов для отображения.</p>;
  }

  return (
    <div className="py-6">
      {/* Центрируем грид внутри основного контента (отступ слева задаётся в StoreWrapper) */}
      <div className="flex w-full justify-center">
        {/* w-fit — ширина ровно под 4×234px карточки + 3×30px gap */}
        <div className="grid w-fit grid-cols-4 gap-x-[30px] gap-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-dark-700 border-dark-300 h-[391px] w-[234px] overflow-hidden rounded-xl border shadow-md transition hover:shadow-lg"
            >
              <div className="relative h-[234px] w-full">
                {post.photos.length > 0 && (
                  <Image
                    src={post.photos[0]}
                    alt={`Post ${post.id}`}
                    fill
                    sizes="234px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-light-100 line-clamp-1 text-lg font-semibold">
                  Пост #{post.id}
                </h2>
                <p className="text-light-900 mt-2 line-clamp-2 text-sm">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
