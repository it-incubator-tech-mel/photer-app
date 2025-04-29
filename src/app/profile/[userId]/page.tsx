// // app/profile/[userId]/page.tsx
// 'use client';

// import { useGetMeQuery } from '@/features/auth/api/authApi';
// import { useLogout } from '@/features/auth/hooks/useLogout';
// import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
// import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
// import { ReactElement } from 'react';

// export default function Page(): ReactElement {
//   const { isOpen, openModal, closeModal, confirmLogout } = useLogout();
//   const { data } = useGetMeQuery();

//   return (
//     <div>
//       <h1>Profile {data?.email}</h1>
//       <LogoutButton openModal={openModal} />
//       <LogoutModal
//         open={isOpen}
//         userEmail={''}
//         onConfirmed={confirmLogout}
//         onCanceled={closeModal}
//       />
//     </div>
//   );
// }

/////////////////////////////

// // app/profile/[userId]/page.tsx
// 'use client';

// import { ReactElement } from 'react';

// export default function Page(): ReactElement {
//   return (
//     <div>
//       <h1>🔧 Profile Page Stub</h1>
//       <p>This is a placeholder page for user profile.</p>
//     </div>
//   );
// }
/////////////////////////////
// // app/profile/[userId]/page.tsx

// import { getUserProfile } from '@/shared/api/profile';
// import { notFound } from 'next/navigation';
// import { UserProfile } from '@/widgets/profile/UserProfile';

// export default async function UserProfilePage({
//   params,
// }: {
//   params: { userId: string };
// }) {
//   const profile = await getUserProfile(params.userId);

//   if (!profile) return notFound();

//   return <UserProfile profile={profile} />;
// }
/////////////////////////////
// app/profile/[userId]/page.tsx

// import { ReactElement } from 'react';
// import { notFound, redirect } from 'next/navigation';
// import { PostModal } from '@/widgets/post/PostModal';
// import { getPostById } from '@/entities/post/api/getPostById';

// type ProfilePageProps = {
//   params: { userId: string };
//   searchParams: { postId?: string; action?: string };
// };

// export default async function ProfilePage({
//   params,
//   searchParams,
// }: ProfilePageProps): Promise<ReactElement> {
//   const { userId } = params;
//   const { postId, action } = searchParams;

//   if (!userId) return notFound();

//   if (postId && action) {
//     redirect(`/profile/${userId}?postId=${postId}`);
//   }

//   let post = null;

//   if (postId) {
//     post = await getPostById(postId);
//     if (!post) return notFound();
//   }

//   return (
//     <div className="p-4 text-white">
//       <h1 className="text-2xl font-bold">Профиль пользователя {userId}</h1>

//       {/* Здесь потом будет список постов пользователя */}

//       {post && <PostModal post={post} />}
//     </div>
//   );
// }

/////////////////////////////
// app/profile/[userId]/page.tsx

// import { notFound, redirect } from 'next/navigation';
// import { ReactElement } from 'react';
// // import { getPostById } from '@/entities/post/api/postApi';
// import { PostModal } from '@/widgets/post/PostModal';
// import { getPostById } from '@/entities/post/api/getPostById';

// type ProfilePageProps = {
//   params: { userId: string };
//   searchParams: { postId?: string; action?: string };
// };

// export default async function ProfilePage({
//   params,
//   searchParams,
// }: ProfilePageProps): Promise<ReactElement> {
//   const { userId } = params;
//   const { postId, action } = searchParams;

//   if (!userId) {
//     return notFound();
//   }

//   // 1. Если есть и postId и action одновременно — убираем action
//   if (postId && action) {
//     redirect(`/profile/${userId}?postId=${postId}`);
//   }

//   // 2. Если есть только postId — грузим пост
//   let post = null;
//   if (postId) {
//     post = await getPostById(postId);

//     if (!post) {
//       return notFound();
//     }
//   }

//   return (
//     <div className="p-4 text-white">
//       <h1 className="text-2xl font-bold">Профиль пользователя {userId}</h1>

//       {/* TODO: здесь потом выведем список постов пользователя */}

//       {/* Если есть пост — показываем модалку */}
//       {post && <PostModal post={post} />}
//     </div>
//   );
// }

/////////////////////////////
// app/profile/[userId]/page.tsx

// 'use client';

// import { useGetPostByIdQuery } from '@/entities/post/api/postApi';
// import { PostModal } from '@/widgets/post/PostModal';
// import { Spinner } from '@/shared/ui/spinner/Spinner';
// import { notFound, redirect } from 'next/navigation';
// import { ReactElement } from 'react';

// type ProfilePageProps = {
//   params: { userId: string };
//   searchParams: { postId?: string; action?: string };
// };

// export default function ProfilePage({
//   params,
//   searchParams,
// }: ProfilePageProps): ReactElement {
//   const { userId } = params;
//   const { postId, action } = searchParams;

//   if (!userId) return notFound();

//   if (postId && action) {
//     redirect(`/profile/${userId}?postId=${postId}`);
//   }

//   const {
//     data: post,
//     isLoading,
//     isError,
//   } = useGetPostByIdQuery(postId!, {
//     skip: !postId, // если нет postId, запрос не делаем
//   });

//   if (isLoading) {
//     return <Spinner fullScreen />;
//   }

//   if (isError || !post) {
//     return notFound();
//   }

//   return (
//     <div className="p-4 text-white">
//       <h1 className="text-2xl font-bold">Профиль пользователя {userId}</h1>

//       {/* Здесь потом будет список постов пользователя */}

//       {post && <PostModal post={post} />}
//     </div>
//   );
// }
///////////////////////
// src/app/profile/[userId]/page.tsx

// 'use client';

// import { ReactElement } from 'react';
// import { notFound, redirect } from 'next/navigation';
// import {
//   useGetUserPostsQuery,
//   useGetPostByIdQuery,
// } from '@/entities/post/api/postApi';
// import { PostCard } from '@/entities/post/ui/PostCard';
// import { PostModal } from '@/widgets/post/PostModal';

// type ProfilePageProps = {
//   params: { userId: string };
//   searchParams: { postId?: string; action?: string };
// };

// export default function ProfilePage({
//   params,
//   searchParams,
// }: ProfilePageProps): ReactElement {
//   const { userId } = params;
//   const { postId, action } = searchParams;

//   if (!userId) return notFound();

//   // Убираем конфликт параметров
//   if (postId && action) {
//     redirect(`/profile/${userId}?postId=${postId}`);
//   }

//   const { data: posts = [], isLoading } = useGetUserPostsQuery(userId);

//   const { data: post } = useGetPostByIdQuery(postId!, { skip: !postId });

//   return (
//     <div className="p-4 text-white">
//       <h1 className="mb-6 text-2xl font-bold">Профиль пользователя {userId}</h1>

//       {/* Показ постов */}
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {isLoading
//           ? Array.from({ length: 4 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-dark-500 h-[391px] w-[234px] animate-pulse rounded-xl"
//               ></div>
//             ))
//           : posts.map((post) => <PostCard key={post.id} post={post} />)}
//       </div>

//       {/* Модалка поста */}
//       {post && <PostModal post={post} />}
//     </div>
//   );
// }
///////////////////////
// src/app/profile/[userId]/page.tsx

// 'use client';

// import { ReactElement } from 'react';
// import { notFound, redirect } from 'next/navigation';
// import {
//   useGetUserPostsQuery,
//   useGetPostByIdQuery,
// } from '@/entities/post/api/postApi';
// import { PostCard } from '@/entities/post/ui/PostCard';
// import { PostModal } from '@/widgets/post/PostModal';

// type ProfilePageProps = {
//   params: { userId: string };
//   searchParams: { postId?: string; action?: string };
// };

// export default function ProfilePage({
//   params,
//   searchParams,
// }: ProfilePageProps): ReactElement {
//   const { userId } = params;
//   const { postId, action } = searchParams;

//   if (!userId) return notFound();

//   // Если есть конфликт в query-параметрах
//   if (postId && action) {
//     redirect(`/profile/${userId}?postId=${postId}`);
//   }

//   const { data: posts = [], isLoading, isError } = useGetUserPostsQuery(userId);

//   const { data: post } = useGetPostByIdQuery(postId!, { skip: !postId });

//   if (isError) return notFound(); // если ошибка загрузки профиля

//   return (
//     <div className="text-light-100 mx-auto max-w-[1280px] p-4">
//       {/* Заголовок */}
//       <h1 className="mb-6 text-center text-2xl font-bold">
//         Профиль пользователя {userId}
//       </h1>

//       {/* Посты */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div
//               key={i}
//               className="bg-dark-500 h-[391px] w-[234px] animate-pulse rounded-xl"
//             ></div>
//           ))}
//         </div>
//       ) : posts.length > 0 ? (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {posts.map((post) => (
//             <PostCard key={post.id} post={post} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-light-900 mt-10 text-center">No posts yet 😔</div>
//       )}

//       {/* Модалка поста */}
//       {post && <PostModal post={post} />}
//     </div>
//   );
// }
///////////////////////
// src/app/profile/[userId]/page.tsx

import { ReactElement } from 'react';
import { notFound, redirect } from 'next/navigation';
import { PostModal } from '@/widgets/post/PostModal';
import { getPostById } from '@/entities/post/api/getPostById';

type ProfilePageProps = {
  params: { userId: string };
  searchParams: { postId?: string; action?: string };
};

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps): Promise<ReactElement> {
  const { userId } = params;
  const { postId, action } = searchParams;

  if (!userId) return notFound();

  // ⚡ Конфликт параметров: убираем лишние
  if (postId && action) {
    redirect(`/profile/${userId}?postId=${postId}`);
  }

  let post = null;

  if (postId) {
    try {
      post = await getPostById(postId);

      if (!post) {
        console.warn(`Пост с id=${postId} не найден`);
        // Если нет поста — редирект обратно на профиль без модалки
        redirect(`/profile/${userId}`);
      }
    } catch (error) {
      console.error('Ошибка при загрузке поста:', error);
      redirect(`/profile/${userId}`);
    }
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold">Профиль пользователя {userId}</h1>

      {/* Здесь потом будет список постов пользователя */}

      {/* Модалка поста */}
      {post && <PostModal post={post} />}
    </div>
  );
}
// /////////////////

// import { ReactElement } from 'react';
// import { notFound, redirect } from 'next/navigation';
// import { PostModal } from '@/widgets/post/PostModal';
// import { getPostById } from '@/entities/post/api/getPostById';
// import { use } from 'react';

// type ProfilePageProps = {
//   params: Promise<{ userId: string }>;
//   searchParams: Promise<{ postId?: string; action?: string }>;
// };

// export default async function ProfilePage({
//   params,
//   searchParams,
// }: ProfilePageProps): Promise<ReactElement> {
//   const { userId } = use(params);
//   const { postId, action } = use(searchParams);

//   if (!userId) return notFound();

//   if (postId && action) {
//     redirect(`/profile/${userId}?postId=${postId}`);
//   }

//   let post = null;

//   if (postId) {
//     try {
//       post = await getPostById(postId);
//       if (!post) {
//         console.warn(`Пост с id=${postId} не найден`);
//         redirect(`/profile/${userId}`);
//       }
//     } catch (error) {
//       console.error('Ошибка при загрузке поста:', error);
//       redirect(`/profile/${userId}`);
//     }
//   }

//   return (
//     <div className="p-4 text-white">
//       <h1 className="text-2xl font-bold">Профиль пользователя {userId}</h1>
//       {post && <PostModal post={post} />}
//     </div>
//   );
// }
