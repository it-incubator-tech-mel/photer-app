// src/app/@modals/(.)post/[postId]/page.tsx
import { notFound } from 'next/navigation';
import { ModalSSR } from '@/shared/ui/modal/ModalSSR';
import { PostType } from '@/features/posts/lib/post.types';
import { MyPostModalFromServer } from '@/widgets/posts/postView/MyPostModalFromServ';

export default async function GlobalPostModal({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) return notFound();

  const post: PostType = await res.json();

  return (
    <ModalSSR>
      <MyPostModalFromServer post={post} />
    </ModalSSR>
  );
}
