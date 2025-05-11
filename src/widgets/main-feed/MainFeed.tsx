// src/widgets/main-feed/MainFeed.tsx
'use client';

import { Post } from '@/entities/post/model/types';
import Image from 'next/image';
import Link from 'next/link';
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
      {/* Центрируем контент и задаём максимальную ширину */}
      <div className="mx-auto w-full max-w-[1050px] px-4">
        <div className="grid grid-cols-1 gap-x-[30px] gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`} //  глобальный путь
              scroll={false}
              className="bg-dark-700 border-dark-300 mx-auto h-[391px] w-[234px] overflow-hidden rounded-xl border shadow-md transition hover:shadow-lg"
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
