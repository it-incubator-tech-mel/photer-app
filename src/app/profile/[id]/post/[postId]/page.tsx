// src/app/profile/[id]/post/[postId]/page.tsx
import { notFound, redirect } from 'next/navigation';
import { PostType } from '@/features/posts/lib/post.types';
import { PostModalSSR } from '@/widgets/posts/postView/PostModalSSR';
import { ProfileCard } from '@/widgets/profile-card/ui/ProfileCard';

export default async function SSRPublicPost({
  params,
}: {
  params: Promise<{ id: string; postId: string }>;
}) {
  const { id, postId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) return notFound();

  const post: PostType = await res.json();

  return (
    <div className={'h-full max-w-7xl px-[24px] pt-9'}>
      <ProfileCard isOwner={false} isAuthorized={false} />
      <PostModalSSR profileId={id} post={post} />
    </div>
  );
}
