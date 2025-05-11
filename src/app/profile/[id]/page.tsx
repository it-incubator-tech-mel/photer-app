'use client';

import { ReactElement, useMemo } from 'react';
import { PostsList } from '@/widgets/posts-list/ui/PostsList';
import { useParams } from 'next/navigation';
import { useGetMeQuery } from '@/features/auth/api/authApi';
import { ProfileCard } from '@/widgets/profile-card/ui/ProfileCard';
import { Spinner } from '@/shared/ui';

  if (isLoading) {
    return <Spinner fullScreen />;
  }

  return (
    <div className={'pl pr- h-full max-w-7xl pt-9 pr-16 pl-[226px]'}>
      <ProfileCard isOwner={isProfileOwner} isAuthorized={!!userData} />
      <PostsList profileId={profileId} />
    </div>
  );
}
