// // src/app/profile/[id]/page.tsx

import { MainFeed } from '@/widgets/main-feed/MainFeed';
import { Post } from '@/entities/post/model/types';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = await params;

  const res = await fetch(
    // Временно: общий список постов (пока нет API по userId)
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts?pageSize=8`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return notFound();

  const data = await res.json();
  const posts: Post[] = data.items;

  const user = {
    username: `user_${userId}`,
    email: `${userId}@example.com`,
    aboutMe: 'Люблю кодить и фотографировать',
    followersCount: 12,
    followingCount: 7,
    postsCount: posts.length,
  };

  return (
    <div className="text-light-100 p-6">
      <h1 className="text-2xl font-bold">Профиль: {user.username}</h1>
      <p className="text-light-900 mt-1">Email: {user.email}</p>

      <div className="text-light-900 mt-4 flex flex-wrap gap-6 text-sm">
        <p>📝 Описание: {user.aboutMe}</p>
        <p>👥 Followers: {user.followersCount}</p>
        <p>➕ Following: {user.followingCount}</p>
        <p>📸 Публикаций: {user.postsCount}</p>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Публикации</h2>

      {posts.length === 0 ? (
        <p className="text-light-900 mt-2">У пользователя нет постов.</p>
      ) : (
        <div className="mt-4">
          <MainFeed posts={posts} />
        </div>
      )}
    </div>
  );
}
