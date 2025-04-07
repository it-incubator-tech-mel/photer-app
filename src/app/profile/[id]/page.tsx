'use client';

import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import { ReactElement } from 'react';
import { IconSprite } from '@/shared/ui';
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from '@/features/auth/api/postApi';

export default function Page(): ReactElement {
  const { isOpen, openModal, closeModal, confirmLogout } = useLogout();
  const { data } = useGetMeQuery();

  const { data: posts = [] } = useGetPostsQuery();

  const [deletePostRequest] = useDeletePostMutation();

  const deletePost = async (postId: number): Promise<void> => {
    try {
      await deletePostRequest(postId).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Мои посты</h1>
        {posts.map((post) => (
          <div
            key={post.id}
            className="border-color-dark-100 border-dark-100 mb-2 w-[137px] rounded-[2px] border p-3 text-[14px]"
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
