//  это код для реального API
// // src/entities/post/api/getPostById.ts

// import { Post } from '@/entities/post/model/types';

// export async function getPostById(postId: string): Promise<Post | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`,
//       {
//         next: { revalidate: 60 },
//         credentials: 'include',
//       }
//     );

//     if (!res.ok) return null;

//     return res.json();
//   } catch (error) {
//     console.error('Failed to fetch post by ID', error);
//     return null;
//   }
// }
///////////////
// Временно вместо реального API-запроса — просто вернуть фейковый пост.
// Создаём фейковый объект, похожий на тот, который приходит с сервера.

// src/entities/post/api/getPostById.ts

import { Post } from '@/entities/post/model/types';

export async function getPostById(postId: string): Promise<Post> {
  // Фейковые данные
  return {
    id: Number(postId),
    description: 'Это тестовый пост для проверки модалки!',
    photo: [
      {
        id: 1,
        photoUrl: 'https://placekitten.com/500/300', // Просто картинка котика 🐱
        createdAt: new Date().toISOString(),
      },
    ],
    userId: 123,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
///////////////

// import { Post } from '../model/types';

// export async function getPostById(id: string): Promise<Post | null> {
//   // 👇 Временный фейковый пост
//   return {
//     id: Number(id),
//     description: 'This is a mock post',
//     userId: 1,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     photo: [
//       {
//         id: 1,
//         photoUrl: 'https://via.placeholder.com/500x300',
//         createdAt: new Date().toISOString(),
//       },
//     ],
//   };
// }
