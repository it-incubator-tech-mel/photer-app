'use client';

// src/app/profile/[id]/page.tsx
import { ProfileCard } from '@/widgets/profile-card/ui/ProfileCard';
import { ReactElement, useEffect, use } from 'react';
import { PostsListSSR } from '@/widgets/posts';
import { useGetMeQuery } from '@/features/auth/api/authApi';

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}): ReactElement {
  const { id: profileId } = use(params);
  const { data: userData } = useGetMeQuery();
  const userId = userData?.userId;
  
  useEffect(() => {
    console.log('Debug auth:', {
      accessToken: localStorage.getItem('accessToken'),
      userData,
      userId,
      profileId
    });
  }, [userData, userId, profileId]);

  const isProfileOwner = userId ? userId.toString() === profileId : false;
  const isAuthorized = !!userId;

  return (
    <div className={'h-full max-w-7xl px-[24px] pt-9'}>
      <ProfileCard isOwner={isProfileOwner} isAuthorized={isAuthorized} />
      <PostsListSSR profileId={profileId} />
    </div>
  );
}
