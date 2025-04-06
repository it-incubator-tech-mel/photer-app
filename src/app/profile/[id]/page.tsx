'use client';

import {
  useDeletePostMutation,
  useGetMeQuery,
} from '@/features/auth/api/authApi';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import { ReactElement, useState } from 'react';
import { IconSprite } from '@/shared/ui';
import { mockPosts } from '@/app/profile/[id]/mockPosts';

type Post = {
  id: number;
  title: string;
};

export default function Page(): ReactElement {
  const { isOpen, openModal, closeModal, confirmLogout } = useLogout();
  const { data } = useGetMeQuery();

  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const [deletePostRequest] = useDeletePostMutation();

  const deletePost = async (postId: number): Promise<void> => {
    // try {
    //   await deletePostRequest(postId).unwrap(); // Выполняем запрос на сервер
    //   setPosts((prev) => prev.filter((post) => post.id !== postId)); // Убираем пост из локального состояния
    // } catch (error) {
    //   console.error('Ошибка при удалении поста:', error);
    // }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <div>
      <div>
        <h1>Мои посты</h1>
        {posts.map((post) => (
          <div
            key={post.id}
            className="border-color-dark-100 border-dark-100 mb-2 w-[137px] rounded-[2px] border p-2 p-3 text-[14px]"
          >
            <p>{post.title}</p>
            <button
              onClick={() => deletePost(post.id)}
              className="flex items-center gap-2"
            >
              <IconSprite iconName="trash-outline" widths={20} height={20} />
              Delete Post
            </button>
          </div>
        ))}
      </div>
      <h1>Profile {data?.email}</h1>
      <LogoutButton openModal={openModal} />
      <LogoutModal
        open={isOpen}
        userEmail={''}
        onConfirmed={confirmLogout}
        onCanceled={closeModal}
      />
    </div>
  );
}
