// src/app/page.tsx

import { MainFeed } from '@/widgets/main-feed/MainFeed';
import { Post } from '@/entities/post/model/types';
import { ReactElement } from 'react';

export default async function HomePage(): Promise<ReactElement> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_BASE_URL is not defined!');
    return (
      <p className="text-light-900 p-6">
        Конфигурация окружения некорректна — не задан NEXT_PUBLIC_BASE_URL.
      </p>
    );
  }

  const res = await fetch(`${baseUrl}/posts?pageSize=8`, {
    cache: 'no-store',
  });

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
