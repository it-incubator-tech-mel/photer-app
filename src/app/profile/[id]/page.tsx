// src/app/profile/[id]/page.tsx
import { ProfileCard } from '@/widgets/profile-card/ui/ProfileCard';
import { ReactElement } from 'react';
import { getUserId } from '@/shared/lib/ssr/getUserId';
import { PostsListSSR } from '@/widgets/posts';

export default async function SSRProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const { id: profileId } = await params;
  let isProfileOwner = false;
  const userId = await getUserId();

  if (userId) {
    isProfileOwner = userId == profileId ? true : false;
  }

  return (
    <div className={'h-full max-w-7xl px-[24px] pt-9'}>
      <ProfileCard isOwner={isProfileOwner} isAuthorized={!!userId} />
      <PostsListSSR profileId={profileId} />
    </div>
  );
}
