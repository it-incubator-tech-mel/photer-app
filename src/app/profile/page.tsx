// src/app/profile/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyProfileRedirectPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  //  Неавторизован → на /sign-in
  if (!accessToken) {
    redirect('/sign-in');
  }

  //  Получаем userId через /auth/me
  const res = await fetch('http://localhost:3001/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    redirect('/sign-in');
  }

  const data = await res.json();
  const userId = data.userId;

  //  Редирект на свою страницу профиля
  redirect(`/profile/${userId}`);
}
