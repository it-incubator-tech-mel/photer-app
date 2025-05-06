'use client';

import { useGetMeQuery } from '@/features/auth/api/authApi';
import { ReactElement } from 'react';

export default function Page(): ReactElement {
  const { data } = useGetMeQuery();

  return (
    <div>
      <h1>Profile {data?.email}</h1>
    </div>
  );
}
