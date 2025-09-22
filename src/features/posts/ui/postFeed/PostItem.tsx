'use client';
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import { PostType } from '@/features/posts/lib/post.types';
import { PostModal } from '@/widgets/posts';

type Props = {
  post: PostType;
};

export const PostItem = ({ post }: Props): ReactElement => {
  const [isOpenPost, setIsOpenPost] = useState(false);

  // Логирование данных поста
  console.log('=== POST ITEM DEBUG ===', {
    postId: post.id,
    hasPhotos: !!(post.photos && post.photos.length > 0),
    photosCount: post.photos?.length || 0,
    firstPhoto: post.photos?.[0],
    photosArray: post.photos,
    timestamp: new Date().toISOString(),
  });

  return (
    <>
      {/* Debug logging for PostItem -> PostModal */}
      {isOpenPost &&
        console.log('=== POST ITEM -> POST MODAL DEBUG ===', {
          postId: post.id,
          description: post.description,
          timestamp: new Date().toISOString(),
        })}
      <div
        className={'relative h-57 w-[250px]'}
        onClick={() => setIsOpenPost(true)}
        data-testid="post-item"
      >
        {post.photos.length > 0 ? (
          <div className="relative h-full w-full">
            <img
              src={post.photos[0]}
              alt={'post image'}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>
      {isOpenPost && (
        <PostModal post={post} onCloseAction={() => setIsOpenPost(false)} />
      )}
    </>
  );
};
