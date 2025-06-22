'use client';

import Link from 'next/link';
import { Carousel } from '@/shared/ui';
import Image from 'next/image';
import { AvatarWithName } from '@/features/posts/ui/postView/AvatarWithName';
import { useTimeAgo } from '@/features/posts/hooks/view/useTimePost';
import { Description } from '@/entities/post/ui/Description';
import { PostType } from '@/features/posts/lib/post.types';
import { ReactElement } from 'react';

type Props = {
  post: PostType;
};

export const PublicPostItem = ({ post }: Props): ReactElement => {
  return (
    <div className="flex h-98 w-58 flex-col">
      <Link href={`/profile/${post.userId}/post/${post.id}`} className="h-60">
        <Carousel className="relative h-full">
          {post.photos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt="Post image"
              fill
              className="object-cover"
              unoptimized
              priority={index === 0}
            />
          ))}
        </Carousel>
      </Link>

      <Link href={`/profile/${post.userId}`}>
        <AvatarWithName />
      </Link>

      <span className="small-text text-light-900">
        {useTimeAgo(post.createdAt)}
      </span>

      <Description description={post.description} />
    </div>
  );
};
