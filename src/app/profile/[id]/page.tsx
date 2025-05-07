// src/app/profile/[id]/page.tsx
import { Post } from '@/entities/post/model/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const userId = params.id;

  // Загрузка данных с сервера
  const [userRes, postsRes] = await Promise.all([
    fetch(`${process.env.API_URL}/users/${userId}`, { cache: 'no-store' }),
    fetch(`${process.env.API_URL}/posts/profile/${userId}`, {
      cache: 'no-store',
    }),
  ]);

  if (!userRes.ok || !postsRes.ok) return notFound();

  const user = await userRes.json();
  const posts: Post[] = await postsRes.json();

  return (
    <div className="text-light-100 p-6">
      <h1 className="text-2xl font-bold">Профиль: {user.username}</h1>
      <p className="text-light-900 mt-1">Email: {user.email}</p>

      <h2 className="mt-6 text-xl font-semibold">Посты пользователя</h2>
      {posts.length === 0 ? (
        <p className="text-light-900 mt-2">У пользователя нет постов.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-dark-700 border-dark-300 overflow-hidden rounded-xl border shadow-md"
            >
              <div className="relative h-64 w-full">
                {post.photos.length > 0 && (
                  <Image
                    src={post.photos[0]}
                    alt={`Post ${post.id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="text-light-900 line-clamp-2 text-sm">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
