'use client';

import { ReactElement } from 'react';

export default function ProfilePage(): ReactElement {
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>
        Вы не вошли в систему или ваша сессия истекла, авторизуйтесь пожалуйста
      </p>
    </div>
  );
}
