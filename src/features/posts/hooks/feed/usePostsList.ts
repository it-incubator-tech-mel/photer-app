import { RootState, useAppDispatch } from '@/shared/state/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { postsApi, useLazyGetProfilePostsQuery } from '../../api/postsApi';
import { useSelector } from 'react-redux';
import { Posts } from '../../lib/post.types';
import { cachedProfilePages } from '../../model/postSlice';
import { useInfiniteScroll } from './useInfiniteScroll';

type Props = {
  ssrPosts?: Posts;
  profileId: string;
};
export const usePostsList = ({ ssrPosts, profileId }: Props) => {
  const dispatch = useAppDispatch();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [getProfilePosts, { isFetching }] = useLazyGetProfilePostsQuery();
  const pageNumber = useSelector(
    (state: RootState) => state.post.cachedProfilePages
  );

  console.log('pageNumber', pageNumber);
  const postsFromCache = useSelector(
    (state: RootState) =>
      postsApi.endpoints.getProfilePosts.select({
        profileId,
        pageNumber,
      })(state).data
  );

  const [posts, setPosts] = useState<Posts | undefined>(
    postsFromCache || ssrPosts
  );

  useEffect(() => {
    setPosts(postsFromCache);
  }, [postsFromCache]);

  useEffect(() => {
    if (!postsFromCache && ssrPosts) {
      dispatch(cachedProfilePages(1));
      const thunk = postsApi.util.upsertQueryData(
        'getProfilePosts',
        {
          profileId,
          pageNumber: 1,
        },
        ssrPosts
      );
      dispatch(thunk);
    }
  }, []);

  const hasMore = posts && posts?.page < posts?.pagesCount;

  const fetchNewPartPosts = useCallback(() => {
    dispatch(cachedProfilePages(posts!.page + 1));
    getProfilePosts({ profileId, pageNumber });
  }, [dispatch, posts, profileId]);

  useInfiniteScroll({ callback: fetchNewPartPosts, hasMore, triggerRef });
  return {
    posts,
    isFetching,
    triggerRef,
    hasMore,
  };
};
