'use client';

import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostType } from '@/features/posts/types/post.types';

type Props = {
  post: PostType;
};

export const PostItem = ({ post }: Props): ReactElement => {
  return (
    <Link
      href={{
        pathname: `/profile/${post.userId}`, // фон — профиль автора
        query: { postId: post.id }, // открываем модалку по ID поста
      }}
      scroll={false}
      shallow
    >
      <div className="relative h-57 w-58 cursor-pointer">
        <Image
          src={post.photos[0]}
          alt="post image"
          unoptimized
          fill
          className="object-cover"
          // object-contain
        />
      </div>
    </Link>
  );
};
