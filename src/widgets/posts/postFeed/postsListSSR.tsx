import { ReactElement } from 'react';
import { PostsList } from './PostsList';

type Props = {
  profileId: string;
};
export async function PostsListSSR({
  profileId,
}: Props): Promise<ReactElement> {
  const res = await fetch(
    // `/posts/users/${profileId}?pageNumber=${pageNumber}`,
    // `${process.env.NEXT_PUBLIC_BASE_URL}/posts/users/${profileId}?pageNumber=1`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts/users/${profileId}?pageNumber=1&pageSize=8&sortDirection=desc&sortBy=createdAt`,
    {
      cache: 'no-store',
    }
  );
  const posts = await res.json();
  console.log('profId', profileId);
  return <PostsList posts={posts} profileId={profileId} />;
}
