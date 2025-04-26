// src/app/page.tsx

import { MainFeed } from '@/widgets/MainFeed/ui/MainFeed';
import { getPosts } from '@/shared/api/getPosts';
import { Post } from '@/entities/post/model/types';

export default async function HomePage() {
  const posts: Post[] = await getPosts(); // SSR
  return <MainFeed initialPosts={posts} />;
}
// ///////////////////////////////////////////
