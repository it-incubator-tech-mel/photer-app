// app/post/[postId]/page.tsx

import { getPostById } from '@/shared/api/post';
import { notFound } from 'next/navigation';
import { PostModal } from '@/widgets/post/PostModal';

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPostById(params.postId);

  if (!post) return notFound();

  return <PostModal post={post} />;
}
