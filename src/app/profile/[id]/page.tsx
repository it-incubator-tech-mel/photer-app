// src/app/profile/[id]/page.tsx

import { ReactElement } from 'react';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const { id: userId } = await params;

  return (
    <div className="text-light-100 p-8">
      <h1 className="text-2xl font-bold">Профиль пользователя</h1>
      <p className="mt-4">ID пользователя: {userId}</p>
      <p className="mt-2">Имя: John Doe</p>
      <p className="mt-2">Email: johndoe@example.com</p>
      <p className="mt-2">Количество постов: 4</p>
    </div>
  );
}
