// src/widgets/MainFeed/ui/MainFeed.tsx
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
    pollingInterval: 60_000,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const lastPosts = posts.slice(0, 4);

  if (isLoading && posts.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {lastPosts.map((post) => (
        <div key={post.id}>
          <p>Post #{post.id}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {post.photo.slice(0, 1).map((photo) => (
              <img
                key={photo.id}
                src={photo.photoUrl.replace(
                  /^https:\/\/https:\/\//,
                  'https://'
                )}
                alt={`Photo ${photo.id}`}
                width={150}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
