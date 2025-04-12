'use client';

import { Button } from '@/shared/ui';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div>
      <main>
        Вы не вошли в систему или ваша сессия истекла, авторизуйтесь пожалуйста{' '}
        <Button asChild variant={'text'}>
          <Link href="/sign-in">Войти</Link>
        </Button>
      </main>
    </div>
  );
}
