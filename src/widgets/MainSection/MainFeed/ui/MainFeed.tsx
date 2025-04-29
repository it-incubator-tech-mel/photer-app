// src/widgets/MainSection/MainFeed/ui/MainFeed.tsx
'use client';

import { ReactElement, useEffect } from 'react';
import { Post } from '@/entities/post/model/types';
import { useAppDispatch } from '@/shared/state/store';
import { PostCard } from '@/entities/post/ui/PostCard';
import { SkeletonCard } from '@/entities/post/ui/SkeletonCard';
import { postsApi, useGetPostsQuery } from '@/entities/post/api/postsApi';

type MainFeedProps = {
  initialPosts: Post[];
};

export const MainFeed = ({ initialPosts }: MainFeedProps): ReactElement => {
  const dispatch = useAppDispatch();

  // Заполняем кэш RTK Query начальными постами
  useEffect(() => {
    if (initialPosts.length > 0) {
      dispatch(
        postsApi.util.upsertQueryData('getPosts', undefined, initialPosts)
      );
    }
  }, [dispatch, initialPosts]);

  const { data: posts = initialPosts, isLoading } = useGetPostsQuery(
    undefined,
    {
      pollingInterval: 60000, // обновлять раз в минуту
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  const lastPosts = posts.slice(0, 4);

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      style={{ width: '972px', margin: '0 auto' }}
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : lastPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};
// ////////////
