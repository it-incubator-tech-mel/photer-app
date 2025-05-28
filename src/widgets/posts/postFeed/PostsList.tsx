'use client';

import { ReactElement, useCallback, useRef } from 'react';
import { useAppDispatch } from '@/shared/state/store';
import {
  postsApi,
  useGetProfilePostsQuery,
} from '@/features/posts/api/postsApi';
import { useInfiniteScroll } from '@/features/posts/hooks/feed/useInfiniteScroll';
import { PostItem } from './PostItem';
import { Posts } from '@/features/posts/lib/post.types';

type Props = {
  profileId: string;
  posts?: Posts;
};

export const PostsList = ({ profileId, posts }: Props): ReactElement => {
  const { data, isFetching } = useGetProfilePostsQuery({
    profileId,
    pageNumber: 1,
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const hasMore = posts && posts?.page <= posts?.pagesCount;
  const fetchNewPartPosts = useCallback(() => {
    if (posts) {
      dispatch(
        postsApi.endpoints.getProfilePosts.initiate(
          { profileId, pageNumber: posts.page + 1 },
          {
            subscribe: false,
            forceRefetch: true,
          }
        )
      );
    }
  }, [dispatch, posts, profileId]);

  useInfiniteScroll({ callback: fetchNewPartPosts, hasMore, triggerRef });

  // {
  //   isFetching ? 'Загрузка...' : hasMore ? 'Прокрути вниз 👇' : 'Конец 🎉';
  // }
  return (
    <div className="mt-12 flex flex-col">
      <div className="flex flex-wrap gap-[12px]">
        {posts?.items.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
      <div
        ref={triggerRef}
        className="col-span-full py-4 text-center text-gray-500"
      ></div>
    </div>
  );
};
