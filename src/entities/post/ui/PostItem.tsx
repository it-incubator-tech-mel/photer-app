'use client';
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import { PostType } from '@/features/postModal/lib/post.types';
import { MyPostModal } from '@/features/postModal';

type Props = {
  post: PostType;
};

export const PostItem = ({ post }: Props): ReactElement => {
  const [isOpenPost, setIsOpenPost] = useState(false);

  return (
    <>
      <div className={'relative h-57 w-58'} onClick={() => setIsOpenPost(true)}>
        <Image
          src={post.photos[0]}
          alt={'post image'}
          unoptimized
          fill
          className="object-cover"
        />
      </div>
      {isOpenPost && (
        <MyPostModal
          postId={post.id}
          onCloseAction={() => setIsOpenPost(false)}
        />
      )}
    </>
  );
};
