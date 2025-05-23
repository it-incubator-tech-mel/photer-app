// src/app/(auth)/sign-in/page.tsx

'use client';

import { ReactElement } from 'react';
import LogIn from '@/features/auth/sign-in/ui/LogIn';
import Link from 'next/link';

export default function Page(): ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <LogIn />
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
