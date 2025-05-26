'use client';

import { ReactElement, useCallback, useRef } from 'react';
import { useAppDispatch } from '@/shared/state/store';
import {
  postsApi,
  useGetProfilePostsQuery,
} from '@/features/posts/api/postsApi';
import { useInfiniteScroll } from '@/features/posts/hooks/feed/useInfiniteScroll';
import { PostItem } from './PostItem';

type Props = {
  profileId: string;
};

export const PostsList = ({ profileId }: Props): ReactElement => {
  const { data: posts, isFetching } = useGetProfilePostsQuery({
    profileId,
    pageNumber: 1,
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const hasMore = posts && posts?.page < posts?.pagesCount;
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

  return (
    <div className="mt-12 flex flex-col">
      <div className="flex flex-wrap gap-[12px]">
        {posts?.items.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
      <div
        ref={triggerRef}
        className="col-span-full py-4 text-center text-gray-500"
      >
        {isFetching ? 'Загрузка...' : hasMore ? 'Прокрути вниз 👇' : 'Конец 🎉'}
      </div>
    </div>
  );
};
