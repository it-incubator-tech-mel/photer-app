import { useGetMeQuery } from '../api/authApi';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useIsProfileOwner = () => {
  const { data: user } = useGetMeQuery();
  const params = useParams();
  const profileId = params?.id as string;

  return useMemo(() => {
    if (!user || !profileId) {
      return false;
    }

    return user.userId.toString() === profileId;
  }, [user?.userId, profileId]);
}; 