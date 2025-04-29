// // entities/post/ui/PostCard.tsx

// 'use client';

// import { ReactElement } from 'react';
// import { Post } from '@/entities/post/model/types';

// type PostCardProps = {
//   post: Post;
// };

// export const PostCard = ({ post }: PostCardProps): ReactElement => {
//   const mainPhoto = post.photo[0]?.photoUrl || '/no-image.png'; // защита если нет фото

//   return (
//     <div
//       className="bg-dark-500 flex w-[234px] flex-col overflow-hidden rounded-2xl"
//       style={{ height: '391px' }}
//     >
//       {/* Фото поста */}
//       <div className="relative h-[240px] w-full">
//         <img
//           src={mainPhoto.replace(/^https:\/\/https:\/\//, 'https://')}
//           alt="Post image"
//           className="h-full w-full object-cover"
//         />
//       </div>

//       {/* Блок текста */}
//       <div className="flex flex-1 flex-col justify-between p-3">
//         {/* Имя пользователя заглушка */}
//         <span className="text-light-100 text-[16px] font-semibold">
//           Username
//         </span>

//         {/* Дата */}
//         <span className="text-light-900 mt-1 text-[12px]">
//           {new Date(post.createdAt).toLocaleDateString()}
//         </span>

//         {/* Описание (если есть) */}
//         {post.description && (
//           <p className="text-light-100 mt-2 line-clamp-2 text-[14px]">
//             {post.description}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
/////////////
// entities/post/ui/PostCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { Post } from '@/entities/post/model/types';
import { Card } from '@/widgets/card/Card';

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps): ReactElement => {
  const router = useRouter();

  const mainPhoto = post.photo[0]?.photoUrl || '/no-image.png';

  const handleClick = () => {
    router.push(`/profile/${post.userId}?postId=${post.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="flex w-[234px] cursor-pointer flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
      style={{ height: '391px' }}
    >
      {/* Фото поста */}
      <div className="relative h-[240px] w-full">
        <img
          src={mainPhoto.replace(/^https:\/\/https:\/\//, 'https://')}
          alt="Post image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Блок текста */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <span className="text-light-100 text-[16px] font-semibold">
          Username
        </span>

        <span className="text-light-900 mt-1 text-[12px]">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>

        {post.description && (
          <p className="text-light-100 mt-2 line-clamp-2 text-[14px]">
            {post.description}
          </p>
        )}
      </div>
    </Card>
  );
};
////////////////
