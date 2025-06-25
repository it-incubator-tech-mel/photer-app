'use client';

import { PostsList } from '@/features/posts/ui/postFeed/PostsList';
import { ReactElement } from 'react';
import { useGetProfilePostsQuery } from '@/features/posts/api/postsApi';

type Props = {
  profileId: string;
};

export function PostsListSSR({ profileId }: Props): ReactElement {
  const { data: posts } = useGetProfilePostsQuery({ profileId, pageNumber: 1 });

  return <PostsList ssrPosts={posts} profileId={profileId} />;
}
