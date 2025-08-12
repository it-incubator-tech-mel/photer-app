// src/app/settings/page.tsx
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { SettingsClient } from './SettingsClient';

export default async function Page() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    console.log('[Page] ⛔️ refreshToken не найден в cookie');
    return notFound();
  }

  const refreshRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
    {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      credentials: 'include',
    }
  );

  if (!refreshRes.ok) {
    console.log('[Page] ❌ Ошибка запроса refresh-token:', refreshRes.status);
    return notFound();
  }

  const { accessToken } = await refreshRes.json();
  console.log('[Page] 🟢 accessToken получен:', accessToken);

  const meRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!meRes.ok) {
    console.log('[Page] ❌ Ошибка запроса /auth/me:', meRes.status);
    return notFound();
  }

  const me = await meRes.json();

  return <SettingsClient accessToken={accessToken} userId={me.userId} />;
}
