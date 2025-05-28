// // src/app/(auth)/sign-in/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLoginMutation } from '@/features/auth/api/authApi';
import { Spinner } from '@/shared/ui';
import LogIn from '@/features/auth/sign-in/ui/LogIn';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      router.replace(redirectTo);
    }
  }, [isSuccess, redirectTo, router]);

  const handleSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    await login(formData);
  };

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">Вход в аккаунт</h1>
      {isLoading && <Spinner />}
      <LogIn onSubmit={handleSubmit} />
    </div>
  );
}
