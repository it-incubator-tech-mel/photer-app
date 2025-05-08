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
/////////////////////////////////
// src/app/profile/page.tsx

// import { redirect } from 'next/navigation';

// export default async function MyProfileRedirectPage() {
//   try {
//     //const res = await fetch(`${process.env.API_URL}/auth/me`, {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
//       // ⬇️ включаем куки для авторизации
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'no-store', // ⚠️ не кэшируем auth-запрос
//     });

//     if (!res.ok) {
//       // ⛔ Не авторизован — редиректим на главную
//       redirect('/');
//     }

//     const data = await res.json();
//     const userId = data.id;

//     if (!userId) {
//       redirect('/');
//     }

//     // ✅ Редиректим на профиль пользователя
//     redirect(`/profile/${userId}`);
//   } catch (error) {
//     // 🔍 Логируем ошибку в консоль (только для dev-режима)
//     console.error('Auth error:', error);
//     // ⚠️ На всякий случай обрабатываем ошибки запроса- В случае ошибки (например, сеть, 401) — редирект на главную
//     redirect('/');
//   }
// }
