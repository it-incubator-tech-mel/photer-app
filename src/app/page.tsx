'use client';

import { PostCreationWizard } from '@/features/post/modal/PostCreationWizard';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { ReactElement, useState } from 'react';

export default function Home(): ReactElement {
  const [addPost, setAddPost] = useState(false);
  return (
    <div>
      <main>
        Вы не вошли в систему или ваша сессия истекла, авторизуйтесь пожалуйста{' '}
        <Button asChild variant={'text'}>
          <Link href="/sign-in">Войти</Link>
        </Button>
        <Button onClick={() => setAddPost(!addPost)}></Button>
        {addPost && <PostCreationWizard />}
      </main>
    </div>
  );
}
