'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import { PostInfo } from './PostInfo';
import { AddComment } from './AddComment';
import { AvatarWithName } from './AvatarWithName';
import { PostDescription } from './PostDescription';
import { ViewComment } from './ViewComment';
import { Carousel } from '@/shared/ui/carousel/Carousel';
import { PostType } from '@/features/posts/types/post.types';

type Props = {
  post: PostType;
  children?: ReactNode;
};

export default function ViewPost({ post, children }: Props): ReactNode {
  return (
    <div className="bg-dark-300 border-dark-100 flex h-[calc(100vh-80px)] w-full max-w-[1280px] overflow-hidden rounded-[2px] border-[1px] sm:h-[calc(100vh-100px)]">
      {/* Левая часть — фото со скроллом при необходимости */}
      <div className="flex-1 overflow-y-auto">
        <Carousel className="h-full w-full">
          <div className="min-h-0 overflow-y-auto">
            {post.photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt="Post image"
                width={800}
                height={800}
                unoptimized
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Правая часть — описание, комментарии, действия */}
      <div className="flex flex-1 flex-col justify-between overflow-y-auto">
        {/* Верх: шапка, описание, комментарии */}
        <div>
          <div className="border-dark-100 flex justify-between border-b px-6 py-3">
            <AvatarWithName />
            {children}
          </div>

          <div className="border-dark-100 flex flex-col gap-4 border-b px-6 pt-4 pb-2">
            <PostDescription
              comment={post.description}
              dateTime={post.updatedAt}
            />
            <ViewComment />
            <ViewComment />
          </div>
        </div>

        {/* Низ: инфо + форма добавления комментария */}
        <div className="border-dark-100 flex flex-col border-t px-6 py-4">
          <PostInfo createdDate={post.createdAt} />
          <AddComment />
        </div>
      </div>
    </div>
  );
}
