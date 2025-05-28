'use client';

import { ReactElement, useCallback, useRef } from 'react';
import {
  postsApi,
  useGetProfilePostsQuery,
} from '@/features/posts/api/postsApi';
import { useAppDispatch } from '@/shared/state/store';
import { PostItem } from '@/entities/post/ui/PostItem';
import { useInfiniteScroll } from '@/features/posts/hooks/useInfiniteScroll';

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

  return (
    <div className="mt-12 grid grid-cols-2 gap-3 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
      {posts?.items.map((post) => <PostItem key={post.id} post={post} />)}
      <div
        ref={triggerRef}
        className="col-span-full py-4 text-center text-gray-500"
      >
        {isFetching ? 'Загрузка...' : hasMore ? 'Прокрути вниз 👇' : 'Конец 🎉'}
      </div>
    </div>
  );
};
