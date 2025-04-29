// 'use client';

// import { Post } from '@/entities/post/model/types';
// import React from 'react';

// type Props = {
//   post: Post;
// };

// export const PostModal: React.FC<Props> = ({ post }) => {
//   return (
//     <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
//       <div className="bg-dark-800 w-full max-w-3xl rounded-lg p-6 shadow-lg">
//         <h2 className="text-light-100 mb-4 text-2xl font-bold">
//           Post #{post.id}
//         </h2>
//         <p className="text-light-200 mb-4">
//           {post.description || 'No description'}
//         </p>

//         <div className="flex flex-wrap gap-4">
//           {post.photo.map((photo) => (
//             <img
//               key={photo.id}
//               src={photo.photoUrl}
//               alt={`Photo ${photo.id}`}
//               className="h-48 rounded object-cover"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
////////////
// src/widgets/post/PostModal.tsx

// 'use client';

// import { ReactElement, useEffect } from 'react';
// import { Post } from '@/entities/post/model/types';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useGetUserProfileQuery } from '@/entities/user/api/userApi';

// type PostModalProps = {
//   post: Post;
// };

// export const PostModal = ({ post }: PostModalProps): ReactElement => {
//   const router = useRouter();

//   // Получаем имя пользователя
//   const { data: user } = useGetUserProfileQuery(post.userId.toString());

//   const handleClose = (): void => {
//     router.back();
//   };

//   // const mainPhoto = post.photo[0]?.photoUrl || '/no-image.png';
//   const mainPhoto =
//     post.photo[0]?.photoUrl || 'https://via.placeholder.com/400x300';

//   // Закрытие по клавише Escape
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         router.back();
//       }
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [router]);

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
//       >
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           transition={{ duration: 0.2 }}
//           className="bg-dark-700 text-light-100 relative w-[400px] rounded-2xl p-6"
//         >
//           {/* Кнопка закрытия */}
//           <button
//             onClick={handleClose}
//             className="absolute top-4 right-4 text-2xl text-white"
//           >
//             ×
//           </button>

//           {/* Фото поста */}
//           <img
//             src={mainPhoto.replace(/^https:\/\/https:\/\//, 'https://')}
//             alt="Post"
//             className="mb-4 h-60 w-full rounded-xl object-cover"
//           />

//           {/* Username */}
//           <h2 className="mb-2 text-lg font-bold">
//             {user?.username || 'Unknown User'}
//           </h2>

//           {/* Дата создания */}
//           <p className="text-light-900 mb-2 text-sm">
//             {new Date(post.createdAt).toLocaleDateString('ru-RU')}
//           </p>

//           {/* Описание поста */}
//           {post.description && (
//             <p className="text-light-100 mb-4 text-base">{post.description}</p>
//           )}

//           {/* Заглушка комментариев */}
//           <div className="mt-4">
//             <h3 className="text-md mb-2 font-bold">Комментарии</h3>
//             <div className="flex flex-col gap-2">
//               <div className="bg-dark-500 rounded p-2">Комментарий 1...</div>
//               <div className="bg-dark-500 rounded p-2">Комментарий 2...</div>
//               <div className="bg-dark-500 rounded p-2">Комментарий 3...</div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };
////////////
// // src/widgets/post/PostModal.tsx

// 'use client';

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogOverlay,
//   DialogPortal,
// } from '@radix-ui/react-dialog';
// import { Post } from '@/entities/post/model/types';
// import { useRouter } from 'next/navigation';
// import { ReactElement } from 'react';
// import { IconSprite } from '@/shared/ui/icon/IconSprite';
// import { cn } from '@/shared/lib/cn';

// type PostModalProps = {
//   post: Post;
// };

// export const PostModal = ({ post }: PostModalProps): ReactElement => {
//   const router = useRouter();

//   const handleClose = (): void => {
//     router.back();
//   };

//   const mainPhoto =
//     post.photo?.[0]?.photoUrl?.replace(/^https:\/\/https:\/\//, 'https://') ||
//     '/no-image.png';

//   return (
//     <Dialog open onOpenChange={handleClose}>
//       <DialogPortal>
//         <DialogOverlay className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm" />

//         <DialogContent
//           className={cn(
//             'bg-dark-700 text-light-100 fixed top-1/2 left-1/2 z-[999] w-[500px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-lg',
//             'focus:outline-none'
//           )}
//         >
//           {/* Кнопка закрытия */}
//           <DialogClose asChild>
//             <button
//               className="text-light-100 hover:text-accent-500 absolute top-4 right-4 focus:outline-none"
//               aria-label="Close"
//             >
//               <IconSprite iconName="close" width="24" height="24" />
//             </button>
//           </DialogClose>

//           {/* Фото поста */}
//           <img
//             src={mainPhoto}
//             alt="Post"
//             className="mb-4 h-60 w-full rounded-xl object-cover"
//           />

//           {/* Имя пользователя (пока заглушка) */}
//           <h2 className="mb-2 text-lg font-bold">Username</h2>

//           {/* Дата создания */}
//           <p className="text-light-900 mb-2 text-sm">
//             {new Date(post.createdAt).toLocaleDateString()}
//           </p>

//           {/* Описание поста */}
//           {post.description && (
//             <p className="text-light-100 text-base">{post.description}</p>
//           )}
//         </DialogContent>
//       </DialogPortal>
//     </Dialog>
//   );
// };
////////////
// // src/widgets/post/PostModal.tsx

'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { Post } from '@/entities/post/model/types';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { IconSprite } from '@/shared/ui/icon/IconSprite';
import { cn } from '@/shared/lib/cn';

type PostModalProps = {
  post: Post;
};

export const PostModal = ({ post }: PostModalProps): ReactElement => {
  const router = useRouter();

  const handleClose = (): void => {
    router.back();
  };

  const mainPhoto =
    post.photo?.[0]?.photoUrl?.replace(/^https:\/\/https:\/\//, 'https://') ||
    '/no-image.png';

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm" />

        <DialogContent
          className={cn(
            'bg-dark-700 text-light-100 fixed top-1/2 left-1/2 z-[999] w-[500px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-lg',
            'focus:outline-none'
          )}
        >
          {/* Добавляем DialogTitle для доступности */}
          <DialogTitle className="sr-only">Post Details</DialogTitle>

          {/* Кнопка закрытия */}
          <DialogClose asChild>
            <button
              className="text-light-100 hover:text-accent-500 absolute top-4 right-4 focus:outline-none"
              aria-label="Close"
            >
              <IconSprite iconName="close" width="24" height="24" />
            </button>
          </DialogClose>

          {/* Фото поста */}
          <img
            src={mainPhoto}
            alt="Post"
            className="mb-4 h-60 w-full rounded-xl object-cover"
          />

          {/* Имя пользователя (пока заглушка) */}
          <h2 className="mb-2 text-lg font-bold">Username</h2>

          {/* Дата создания */}
          <p className="text-light-900 mb-2 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          {/* Описание поста */}
          {post.description && (
            <p className="text-light-100 text-base">{post.description}</p>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
