import { ProfileCard } from '@/widgets/profile-card/ui/ProfileCard';
import { cookies } from 'next/headers';
import { ReactElement } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PostsListSSR } from '@/widgets/posts/postFeed/postsListSSR';
import { PostsList } from '@/widgets/posts';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const { id: profileId } = await params;
  let isProfileOwner = false;

  if (refreshToken) {
    const decoded = jwt.decode(refreshToken);
    const userId = (decoded as JwtPayload).userId;
    isProfileOwner = userId == profileId ? true : false;
  }

  return (
    <div className={'h-full max-w-7xl px-[24px] pt-9'}>
      <ProfileCard isOwner={isProfileOwner} isAuthorized={!!refreshToken} />
      <PostsListSSR profileId={profileId} />
    </div>
  );
}
