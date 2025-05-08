// // src/app/profile/[id]/page.tsx
// import { Post } from '@/entities/post/model/types';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// export default async function ProfilePage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const userId = params.id;

//   // Загрузка данных с сервера
//   const [userRes, postsRes] = await Promise.all([
//    // fetch(`${process.env.API_URL}/users/${userId}`, { cache: 'no-store' }),
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`, { cache: 'no-store' }),

//    // fetch(`${process.env.API_URL}/posts/profile/${userId}`, {
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/profile/${userId}`, {

//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/profile/${userId}`, {

//       cache: 'no-store',
//     }),
//   ]);

//   if (!userRes.ok || !postsRes.ok) return notFound();

//   const user = await userRes.json();
//   const posts: Post[] = await postsRes.json();

//   return (
//     <div className="text-light-100 p-6">
//       <h1 className="text-2xl font-bold">Профиль: {user.username}</h1>
//       <p className="text-light-900 mt-1">Email: {user.email}</p>

//       <h2 className="mt-6 text-xl font-semibold">Посты пользователя</h2>
//       {posts.length === 0 ? (
//         <p className="text-light-900 mt-2">У пользователя нет постов.</p>
//       ) : (
//         <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-dark-700 border-dark-300 overflow-hidden rounded-xl border shadow-md"
//             >
//               <div className="relative h-64 w-full">
//                 {post.photos.length > 0 && (
//                   <Image
//                     src={post.photos[0]}
//                     alt={`Post ${post.id}`}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover"
//                   />
//                 )}
//               </div>
//               <div className="p-4">
//                 <p className="text-light-900 line-clamp-2 text-sm">
//                   {post.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
///////////////
// src/app/profile/[id]/page.tsx
// import Image from 'next/image';

// export const revalidate = 60;

// export default async function ProfilePage() {
//   // Фейковые данные профиля
//   const user = {
//     username: 'john_doe',
//     email: 'john@example.com',
//     aboutMe: 'Люблю фотографировать закаты и кофе ☕',
//     followersCount: 120,
//     followingCount: 85,
//     postsCount: 4,
//   };

//   // Фейковые посты
//   const posts = [
//     {
//       id: '1',
//       description: 'Первый пост с рассветом 🌅',
//       photos: [
//         'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-05/1746457539831-253.jpg',
//       ],
//     },
//     {
//       id: '2',
//       description: 'Мой кофе утром',
//       photos: [
//         'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-04/1746375349361-583.jpg',
//       ],
//     },
//     {
//       id: '3',
//       description: 'Вечер в горах',
//       photos: [
//         'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-04/1746375258561-710.jpg',
//       ],
//     },
//     {
//       id: '4',
//       description: 'Город в дымке',
//       photos: [
//         'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-04/1746374696123-735.jpg',
//       ],
//     },
//     {
//       id: '5',
//       description: 'Облачный день 🌥️',
//       photos: [
//         'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-04/1746373859178-756.jpg',
//       ],
//     },
//   ];

//   return (
//     <div className="text-light-100 p-6">
//       {/* Кнопки входа */}
//       <div className="mb-4 flex justify-end gap-4">
//         <a
//           href="/sign-in"
//           className="bg-accent-500 hover:bg-accent-700 rounded px-4 py-2 text-sm font-medium text-white"
//         >
//           Log In
//         </a>
//         <a
//           href="/sign-up"
//           className="border-light-100 hover:bg-light-100 hover:text-dark-900 rounded border px-4 py-2 text-sm font-medium"
//         >
//           Sign Up
//         </a>
//       </div>

//       {/* Инфо профиля */}
//       <h1 className="text-2xl font-bold">Профиль: {user.username}</h1>
//       <p className="text-light-900 mt-1">Email: {user.email}</p>

//       <div className="text-light-900 mt-4 flex flex-wrap gap-6 text-sm">
//         <p>📝 Описание: {user.aboutMe}</p>
//         <p>👥 Followers: {user.followersCount}</p>
//         <p>➕ Following: {user.followingCount}</p>
//         <p>📸 Публикаций: {user.postsCount}</p>
//       </div>

//       <h2 className="mt-6 text-xl font-semibold">Публикации</h2>
//       {posts.length === 0 ? (
//         <p className="text-light-900 mt-2">У пользователя нет постов.</p>
//       ) : (
//         <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-dark-700 border-dark-300 overflow-hidden rounded-xl border shadow-md"
//             >
//               <div className="relative h-64 w-full">
//                 {post.photos.length > 0 && (
//                   <Image
//                     src={post.photos[0]}
//                     alt={`Post ${post.id}`}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover"
//                   />
//                 )}
//               </div>
//               <div className="p-4">
//                 <p className="text-light-900 line-clamp-2 text-sm">
//                   {post.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
//////////////////////////////

import Image from 'next/image';

export const revalidate = 60;

export default async function ProfilePage() {
  // 🔹 Фейковые данные профиля
  const user = {
    username: 'john_doe',
    email: 'john@example.com',
    aboutMe: 'Люблю фотографировать закаты и кофе ☕',
    followersCount: 120,
    followingCount: 85,
    postsCount: 5,
  };

  // 🔹 Фейковые 5 постов (отображаем только первые 4)
  const posts = [
    {
      id: '1',
      description: 'Первый пост с рассветом 🌅',
      photos: [
        'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-05/1746457539831-253.jpg',
      ],
    },
    {
      id: '2',
      description: 'Мой кофе утром',
      photos: [
        'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-04/1746375349361-583.jpg',
      ],
    },
    {
      id: '3',
      description: 'Вечер в горах',
      photos: [
        'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-04/1746375258561-710.jpg',
      ],
    },
    {
      id: '4',
      description: 'Город в дымке',
      photos: [
        'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-04/1746374696123-735.jpg',
      ],
    },
    {
      id: '5',
      description: 'Облачный день 🌥️',
      photos: [
        'https://storage.yandexcloud.net/inctagram-photer/files/3/2025-05-04/1746373859178-756.jpg',
      ],
    },
  ];

  return (
    <div className="text-light-100 p-6">
      {/* 🔘 Кнопки Log In / Sign Up */}
      <div className="mb-4 flex justify-end gap-4">
        <a
          href="/sign-in"
          className="bg-accent-500 hover:bg-accent-700 rounded px-4 py-2 text-sm font-medium text-white"
        >
          Log In
        </a>
        <a
          href="/sign-up"
          className="border-light-100 hover:bg-light-100 hover:text-dark-900 rounded border px-4 py-2 text-sm font-medium"
        >
          Sign Up
        </a>
      </div>

      {/* 👤 Информация о профиле */}
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
        <div className="mt-4 grid grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post) => (
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
/////////////////////////////
// src/app/profile/[id]/page.tsx

// import { Post } from '@/entities/post/model/types';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// export const revalidate = 60; // ⏱ ISR: обновлять страницу каждые 60 сек

// export default async function ProfilePage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const userId = params.id;

//   // Загрузка данных с ISR-ревалидцией
//   const [userRes, postsRes] = await Promise.all([
//     // fetch(`${process.env.API_URL}/users/${userId}`, {
//        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`, {

//       next: { revalidate: 60 },
//     }),
// //    fetch(`${process.env.API_URL}/posts/profile/${userId}`, {
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/profile/${userId}`, {

//       next: { revalidate: 60 },
//     }),
//   ]);

//   if (!userRes.ok || !postsRes.ok) return notFound();

//   const user = await userRes.json();
//   const posts: Post[] = await postsRes.json();

//   return (
//     <div className="text-light-100 p-6">
//       <h1 className="text-2xl font-bold">Профиль: {user.username}</h1>
//       <p className="text-light-900 mt-1">Email: {user.email}</p>

//       <h2 className="mt-6 text-xl font-semibold">Посты пользователя</h2>
//       {posts.length === 0 ? (
//         <p className="text-light-900 mt-2">У пользователя нет постов.</p>
//       ) : (
//         <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-dark-700 border-dark-300 overflow-hidden rounded-xl border shadow-md"
//             >
//               <div className="relative h-64 w-full">
//                 {post.photos.length > 0 && (
//                   <Image
//                     src={post.photos[0]}
//                     alt={`Post ${post.id}`}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover"
//                   />
//                 )}
//               </div>
//               <div className="p-4">
//                 <p className="text-light-900 line-clamp-2 text-sm">
//                   {post.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
