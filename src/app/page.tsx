// // src/app/page.tsx
// import { MainFeed } from '@/widgets/main-feed/MainFeed';
// import { Post } from '@/entities/post/model/types';
// import { ReactElement } from 'react';

// export default async function HomePage(): Promise<ReactElement> {
//   // const res = await fetch(`${process.env.API_URL}/posts?pageSize=8`, {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?pageSize=8`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) {
//     return <p className="text-light-900 p-6">Ошибка загрузки постов</p>;
//   }

//   const data = await res.json();
//   const posts: Post[] = data.items;

//   return (
//     <main className="flex-1">
//       {/* Заголовок оставляем с px-6, но грид ниже — без внешних padding */}
//       <h1 className="text-light-100 mb-4 px-6 text-2xl font-bold">
//         Лента постов
//       </h1>
//       <MainFeed posts={posts} />
//     </main>
//   );
// }

// src/app/page.tsx
import { MainFeed } from '@/widgets/main-feed/MainFeed';
import { Post } from '@/entities/post/model/types';
import { ReactElement } from 'react';

export const revalidate = 60; // ⏱ ISR: обновлять раз в 60 сек

export default async function HomePage(): Promise<ReactElement> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts?pageSize=8`,
    {
      // ⬇️ включаем ISR для запроса (опционально, можно и без этого)
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return <p className="text-light-900 p-6">Ошибка загрузки постов</p>;
  }

  const data = await res.json();
  const posts: Post[] = data.items;

  return (
    <main className="flex-1">
      <h1 className="text-light-100 mb-4 px-6 text-2xl font-bold">
        Лента постов
      </h1>
      <MainFeed posts={posts} />
    </main>
  );
}
