'use client';
import { useGetMeQuery } from '@/features/auth/api/authApi';
import { Spinner } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';

export default function Page(): ReactElement {
  const { data, error, isLoading } = useGetMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error(error);
      router.push('/sign-in');
    }
    if (!isLoading && data) {
      router.push(`/profile/${data.userId}`);
    }
  }, [error, isLoading, data, router]);

  return <Spinner fullScreen />;
}
