// app/post/[postId]/page.tsx

import { getPostById } from '@/shared/api/post';
import { PostModal } from '@/widgets/post/PostModal';
import { notFound } from 'next/navigation';

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPostById(params.postId);

  if (!post) return notFound();

  return <PostModal post={post} />;
}
///////////////////////////////////////////
