// src/widgets/MainSection/MainFeed/ui/MainFeed.tsx

'use client';

import { postsApi, useGetPostsQuery } from '@/shared/api/postsApi';
import { useEffect } from 'react';
import { Post } from '@/entities/post/model/types';
import { useAppDispatch } from '@/shared/state/store';

type Props = {
  initialPosts: Post[];
};

export const MainFeed = ({ initialPosts }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialPosts.length) {
      dispatch(
        postsApi.util.upsertQueryData('getPosts', undefined, initialPosts)
      );
    }
  }, [dispatch, initialPosts]);

  const { data: posts = [], isLoading } = useGetPostsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const lastPosts = posts.slice(0, 4);

  if (isLoading && posts.length === 0) return <div>Loading...</div>;

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      style={{ width: '972px', margin: '0 auto' }} // равные отступы слева и справа с автоцентрированием
    >
      {lastPosts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col rounded-lg border border-gray-300"
          style={{ width: '234px', height: '391px' }} // фиксированная ширина и высота для каждого поста
        >
          <p className="bold-text-16">Post #{post.id}</p>
          <div className="flex gap-8">
            {post.photo.slice(0, 1).map((photo) => (
              <img
                key={photo.id}
                src={photo.photoUrl.replace(
                  /^https:\/\/https:\/\//,
                  'https://'
                )}
                alt={`Photo ${photo.id}`}
                width={234} // ширина изображения
                height={391} // высота изображения
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
