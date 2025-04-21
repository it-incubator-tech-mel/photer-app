// 'use client';

// import { useEffect, useState } from 'react';
// import { getLatestPosts } from '../api/getLatestPosts';
// import { Post } from '../model/post.types';

// export const MainFeed = () => {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     getLatestPosts().then(setPosts);
//   }, []);

//   return (
//     <div className="space-y-4">
//       {posts.map((post) => (
//         <div key={post.id} className="rounded-lg bg-zinc-900 p-4 shadow">
//           <div className="flex items-center space-x-2">
//             <img
//               src={post.author.avatarUrl}
//               alt={post.author.username}
//               className="h-8 w-8 rounded-full"
//             />
//             <span className="font-semibold text-white">
//               {post.author.username}
//             </span>
//           </div>
//           <img
//             src={post.imageUrl}
//             alt="Post"
//             className="mt-2 w-full rounded-lg object-cover"
//           />
//           <p className="mt-2 text-white">{post.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

//////////////////////////////////////

// 'use client';

// import {
//   useGetLatestPostsQuery,
//   useGetUserCountQuery,
// } from '@/features/main/api/mainApi';

// export const MainFeed = () => {
//   const { data: userCountData, isLoading: userCountLoading } =
//     useGetUserCountQuery(undefined, {
//       pollingInterval: 60000,
//     });

//   const { data: postsData, isLoading: postsLoading } = useGetLatestPostsQuery(
//     undefined,
//     {
//       pollingInterval: 60000,
//     }
//   );

//   if (userCountLoading || postsLoading) {
//     return <p className="text-white">Загрузка...</p>;
//   }

//   const userCount = userCountData?.count || 0;
//   const posts = postsData || []; // ✅ исправлено

//   return (
//     <div className="space-y-4">
//       <div className="text-white">
//         <h3>Количество пользователей: {userCount}</h3>
//       </div>

//       <h2 className="mb-4 text-2xl font-semibold">🔥 Последние посты</h2>
//       {Array.isArray(posts) && posts.length > 0 ? (
//         posts.map((post) => (
//           <div key={post.id} className="rounded-lg bg-zinc-900 p-4 shadow">
//             <div className="flex items-center space-x-2">
//               <img
//                 src={post.author.avatarUrl}
//                 alt={post.author.username}
//                 className="h-8 w-8 rounded-full"
//               />
//               <span className="font-semibold text-white">
//                 {post.author.username}
//               </span>
//             </div>
//             <img
//               src={post.imageUrl}
//               alt="Post"
//               className="mt-2 w-full rounded-lg object-cover"
//             />
//             <p className="mt-2 text-white">{post.description}</p>
//           </div>
//         ))
//       ) : (
//         <p className="text-white">Нет доступных постов.</p>
//       )}
//     </div>
//   );
// };

/////////////////////////////

// 'use client';

// import {
//   useGetLatestPostsQuery,
//   useGetUserCountQuery,
// } from '@/features/main/api/mainApi';

// export const MainFeed = () => {
//   const {
//     data: userCountData,
//     isLoading: userCountLoading,
//     error: userCountError,
//   } = useGetUserCountQuery(undefined, {
//     pollingInterval: 60000,
//   });

//   const {
//     data: postsData,
//     isLoading: postsLoading,
//     error: postsError,
//   } = useGetLatestPostsQuery(undefined, {
//     pollingInterval: 60000,
//   });

//   // Проверяем состояние загрузки
//   if (userCountLoading || postsLoading) {
//     return <p className="text-white">Загрузка...</p>;
//   }

//   // Обработка ошибок
//   if (userCountError) {
//     // Проверка и вывод ошибки
//     const errorMessage =
//       (userCountError as { status: number; data: any }).data?.message ||
//       'Не удалось загрузить количество пользователей';
//     return <p className="text-white">{errorMessage}</p>;
//   }

//   if (postsError) {
//     // Проверка и вывод ошибки
//     const errorMessage =
//       (postsError as { status: number; data: any }).data?.message ||
//       'Не удалось загрузить посты';
//     return <p className="text-white">{errorMessage}</p>;
//   }

//   // Получаем данные
//   const userCount = userCountData?.count || 0;
//   const posts = postsData || [];

//   return (
//     <div className="space-y-4">
//       <div className="text-white">
//         <h3>Количество пользователей: {userCount}</h3>
//       </div>

//       <h2 className="mb-4 text-2xl font-semibold">🔥 Последние посты</h2>
//       {Array.isArray(posts) && posts.length > 0 ? (
//         posts.map((post) => (
//           <div key={post.id} className="rounded-lg bg-zinc-900 p-4 shadow">
//             <div className="flex items-center space-x-2">
//               <img
//                 src={post.author.avatarUrl}
//                 alt={post.author.username}
//                 className="h-8 w-8 rounded-full"
//               />
//               <span className="font-semibold text-white">
//                 {post.author.username}
//               </span>
//             </div>
//             <img
//               src={post.imageUrl}
//               alt="Post"
//               className="mt-2 w-full rounded-lg object-cover"
//             />
//             <p className="mt-2 text-white">{post.description}</p>
//           </div>
//         ))
//       ) : (
//         <p className="text-white">Нет доступных постов.</p>
//       )}
//     </div>
//   );
// };

//////////////////////////////////

'use client';

import {
  useGetLatestPostsQuery,
  useGetUserCountQuery,
} from '@/features/main/api/mainApi';

export const MainFeed = () => {
  // Запросы для получения данных
  const {
    data: userCountData,
    isLoading: userCountLoading,
    error: userCountError,
  } = useGetUserCountQuery(undefined, {
    pollingInterval: 60000,
  });

  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useGetLatestPostsQuery(undefined, {
    pollingInterval: 60000,
  });

  // Универсальная проверка состояния загрузки
  const isLoading = userCountLoading || postsLoading;

  // Функция для получения сообщения об ошибке
  const getErrorMessage = (error: any) => {
    if (error) {
      if ('data' in error) {
        // Если ошибка типа FetchBaseQueryError
        return error?.data?.message || 'Неизвестная ошибка';
      }
      if (error instanceof Error) {
        // Если ошибка типа SerializedError
        return error.message || 'Неизвестная ошибка';
      }
    }
    return 'Неизвестная ошибка';
  };

  // Проверка состояний загрузки или ошибок
  if (isLoading) {
    return <p className="text-white">Загрузка...</p>;
  }

  const userCountErrorMessage = getErrorMessage(userCountError);
  const postsErrorMessage = getErrorMessage(postsError);

  if (userCountError || postsError) {
    return (
      <p className="text-white">{userCountErrorMessage || postsErrorMessage}</p>
    );
  }

  // Получаем данные
  const userCount = userCountData?.count || 0;
  const posts = postsData || [];

  return (
    <div className="space-y-4">
      <div className="text-white">
        <h3>Количество пользователей: {userCount}</h3>
      </div>

      <h2 className="mb-4 text-2xl font-semibold">🔥 Последние посты</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="rounded-lg bg-zinc-900 p-4 shadow">
            <div className="flex items-center space-x-2">
              <img
                src={post.author.avatarUrl}
                alt={post.author.username}
                className="h-8 w-8 rounded-full"
              />
              <span className="font-semibold text-white">
                {post.author.username}
              </span>
            </div>
            <img
              src={post.imageUrl}
              alt="Post"
              className="mt-2 w-full rounded-lg object-cover"
            />
            <p className="mt-2 text-white">{post.description}</p>
          </div>
        ))
      ) : (
        <p className="text-white">Нет доступных постов.</p>
      )}
    </div>
  );
};
