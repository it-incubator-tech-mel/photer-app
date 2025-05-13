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
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts/users/${userId}?pageSize=8`,
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
    postsCount: data.totalCount,
  };

  return (
    <section className="text-light-100 mx-auto max-w-[1050px] px-4 py-6">
      <header className="border-dark-300 mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-light-900 mt-1 text-sm">📧 {user.email}</p>
        <div className="text-light-900 mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <p>📝 {user.aboutMe}</p>
          <p>👥 Followers: {user.followersCount}</p>
          <p>➕ Following: {user.followingCount}</p>
          <p>📸 Публикаций: {user.postsCount}</p>
        </div>
      </header>

      <h2 className="mb-4 text-xl font-semibold">Публикации</h2>

      {posts.length === 0 ? (
        <p className="text-light-900">У пользователя нет постов.</p>
      ) : (
        <MainFeed posts={posts.slice(0, 4)} />
      )}
    </section>
  );
}
