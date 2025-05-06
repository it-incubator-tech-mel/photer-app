// src/app/profile/page.tsx

import { redirect } from 'next/navigation';

export default function MyProfileRedirectPage() {
  const isAuthorized = true; // ❗Заглушка — считаем, что пользователь авторизован
  const userId = '123'; // ❗Заглушка — потом заменишь на реальный ID из куки/стора

  if (!isAuthorized) {
    redirect('/');
  }

  redirect(`/profile/${userId}`);
}
