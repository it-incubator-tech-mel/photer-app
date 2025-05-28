// src/app/profile/[id]/page.tsx
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { MainFeed } from '@/widgets/main-feed/MainFeed';
import { PostType } from '@/features/posts/types/post.types';

export const revalidate = 60;

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = await params;

  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts?userId=${userId}&pageSize=8`
  );

  if (!postsRes.ok) return notFound();

  const data = await postsRes.json();
  const posts: PostType[] = data.items;

  //  Попытка получить текущего пользователя (me)
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let isProfileOwner = false;

  if (refreshToken) {
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

    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json();

      const meRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      });

      if (meRes.ok) {
        const me = await meRes.json();
        isProfileOwner = me.userId?.toString() === userId;
      }
    }
  }

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
          <p>📸 Публикаций: {user.postsCount}</p>

          {isProfileOwner && (
            <>
              <p>👥 Followers: {user.followersCount}</p>
              <p>➕ Following: {user.followingCount}</p>
            </>
          )}
        </div>

        {isProfileOwner && (
          <button className="btn-primary mt-4">Profile Settings</button>
        )}
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
