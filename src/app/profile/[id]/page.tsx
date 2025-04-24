'use client';

import { ReactElement, useEffect, useMemo, useState } from 'react';
import { ProfileInfo } from '@/features/profile/ui/ProfileInfo';
import { PostsList } from '@/features/posts/ui/PostsList';
import { useParams, useRouter } from 'next/navigation';
import { useLazyGetProfilePostsQuery } from '@/features/posts/api/postsApi';
import { isError404 } from '@/shared/types/commonTypes';
import { decodeJwt } from '@/shared/lib/decodeJwt';
import { Spinner } from '@/shared/ui';

export default function Page(): ReactElement {
  const [accessToken, setAccessToken] = useState(null as string | null);
  const { id: profileId } = useParams<{ id: string }>();
  const [getPostsByProfileId, { data: posts, error, isLoading }] =
    useLazyGetProfilePostsQuery();

  const router = useRouter();

  if (isError404(error)) {
    router.push('/not-found');
  }

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'));
  }, []);

  const isProfileOwner = useMemo(() => {
    const userId = decodeJwt(accessToken as string).userId;
    return userId == profileId;
  }, [profileId, accessToken]);

  useEffect(() => {
    if (profileId) {
      getPostsByProfileId({ userId: profileId });
    }
  }, [profileId, getPostsByProfileId]);

  return (
    <div className={'pl pr- h-full max-w-7xl pt-9 pr-16 pl-[226px]'}>
      <ProfileInfo isOwner={isProfileOwner} isAuthorized={!!accessToken} />
      {isLoading ? <Spinner /> : <PostsList posts={posts} />}
    </div>
  );
}
