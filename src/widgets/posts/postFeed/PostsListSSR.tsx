import { PostsList } from '@/features/posts/ui/postFeed/PostsList';
import { ReactElement } from 'react';

type Props = {
  profileId: string;
};
export async function PostsListSSR({
  profileId,
}: Props): Promise<ReactElement> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts/users/${profileId}?pageNumber=1&pageSize=8&sortDirection=desc&sortBy=createdAt`,
    {
      cache: 'no-store',
    }
  );
  const posts = await res.json();

  return <PostsList ssrPosts={posts} profileId={profileId} />;
}
