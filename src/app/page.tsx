// src/app/page.tsx
import { PostType } from '@/features/posts/types/post.types';
import { MainFeed } from '@/widgets/main-feed/MainFeed';
import { ReactElement } from 'react';

export const revalidate = 60; // ISR: обновлять раз в 60 сек

export default async function HomePage(): Promise<ReactElement> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts?pageSize=100`, // запрашиваем больше, чтобы точно выбрать 4
    {
      // включаем ISR для запроса (опционально, можно и без этого)
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return <p className="text-light-900 p-6">Ошибка загрузки постов</p>;
  }

  const data = await res.json();
  const allPosts: PostType[] = data.items;

  // ограничиваем только 4 постами (можешь заменить на 8, 6, и т.п.)
  const posts = allPosts.slice(0, 4);

  return (
    <main className="flex-1">
      <h1 className="text-light-100 mb-4 px-6 text-2xl font-bold">
        Лента постов
      </h1>
      <MainFeed posts={posts} />
    </main>
  );
}
