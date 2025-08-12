// // // src/app/(auth)/sign-in/page.tsx
// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';
// import { Spinner } from '@/shared/ui';
// import LogIn from '@/features/auth/sign-in/ui/LogIn';
// import { useLoginMutation } from '@/features/auth/api/authApi.client';

// export default function SignInPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectTo = searchParams.get('redirect') || '/';

//   const [login, { isLoading, isSuccess }] = useLoginMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       router.replace(redirectTo);
//     }
//   }, [isSuccess, redirectTo, router]);

//   const handleSubmit = async (formData: {
//     email: string;
//     password: string;
//   }) => {
//     await login(formData);
//   };

//   return (
//     <div className="mx-auto max-w-md p-8">
//       <h1 className="mb-4 text-2xl font-bold">Вход в аккаунт</h1>
//       {isLoading && <Spinner />}
//       <LogIn onSubmit={handleSubmit} />
//     </div>
//   );
// }

//////////////////////////////

// src/app/(auth)/sign-in/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '@/shared/ui';
import LogIn from '@/features/auth/sign-in/ui/LogIn';
import { useLoginMutation } from '@/features/auth/api/authApi.client';

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

  // Сообщение при редиректе
  const redirectMessage =
    redirectTo !== '/'
      ? 'Чтобы просмотреть эту страницу, войдите в аккаунт.'
      : null;

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">Вход в аккаунт</h1>

      {redirectMessage && (
        <p className="mb-4 text-sm text-red-600">{redirectMessage}</p>
      )}

      {isLoading && <Spinner />}
      <LogIn onSubmit={handleSubmit} />
    </div>
  );
}
