'use client';

import { useGetMeQuery } from '@/features/auth/api/authApi';
import { Spinner } from '@/shared/ui';
import { PostsList } from '@/widgets/posts';

import { ProfileCard } from '@/widgets/profile-card/ui/ProfileCard';
import { useParams } from 'next/navigation';
import { ReactElement, useMemo } from 'react';

export default function ProfilePage(): ReactElement {
  const params = useParams();
  const { data: userData, isLoading } = useGetMeQuery();

  const { id: profileId } = params as { id: string };

  const isProfileOwner = useMemo(
    () => userData?.userId.toString() === profileId,
    [userData, profileId]
  );

  if (isLoading) {
    return <Spinner fullScreen />;
  }
  return (
    <div className={'h-full max-w-7xl px-[24px] pt-9'}>
      <ProfileCard isOwner={isProfileOwner} isAuthorized={!!userData} />
      <PostsList profileId={profileId} />
    </div>
  );
}
