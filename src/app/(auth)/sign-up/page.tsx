// src/app/(auth)/sign-up/page.tsx
'use client';

import { ReactElement } from 'react';
import SignUpForm from '@/features/auth/sign-up/ui/SignUpForm';
import Link from 'next/link';

export default function Page(): ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <SignUpForm />
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
