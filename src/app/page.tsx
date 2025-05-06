// src/app/page.tsx
'use client';

import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div>
      <main>
        Вы не вошли в систему или ваша сессия истекла, авторизуйтесь пожалуйста{' '}
      </main>
    </div>
  );
}
