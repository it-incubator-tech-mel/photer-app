// src/app/@modal/(.)post/[postId]/page.tsx
import { notFound } from 'next/navigation';
import { ModalClientWrapper } from '@/shared/ui/modal/ModalClientWrapper';
import { ClientModal } from '@/shared/ui/modal/ClientModal';

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

  const post = await res.json();

  return (
    <ModalClientWrapper>
      <ClientModal title={`Пост #${postId}`}>
        <div className="text-light-900 mb-2">{post.description}</div>
        {post.photos?.[0] && (
          <img
            src={post.photos[0]}
            alt="Фото поста"
            className="mt-4 max-w-full rounded-xl"
          />
        )}
      </ClientModal>
    </ModalClientWrapper>
  );
}
