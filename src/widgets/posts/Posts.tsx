'use client';
import { MyPostModal } from '@/features/postModal';
import { useGetPostsQuery } from '@/features/postModal/api/postsApi';
import { Button, Spinner } from '@/shared/ui';
import React, { ReactNode, useState } from 'react';

export const Posts = (): ReactNode => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [openPost, setOpenPost] = useState<number | null>(null);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <p className="my-[20px]">
        Внимание! В данный момент ленты постов еще не реализованы. Поэтому
        отображаются кнопки для открытия постов
      </p>
      <div className="flex flex-col items-center justify-center gap-[20px]">
        {posts &&
          posts.items.map((post, index) => (
            <Button
              key={post.id}
              className="max-w-[200px]"
              onClick={() => setOpenPost(index)}
            >
              Open post {index}
            </Button>
          ))}
      </div>
      {openPost !== null && posts && (
        <MyPostModal
          onCloseAction={() => setOpenPost(null)}
          post={posts.items[openPost]}
        />
      )}
    </div>
  );
};
