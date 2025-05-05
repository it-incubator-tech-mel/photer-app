'use client';

import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
import { openModal } from '@/shared/state/slices/modalSlice';
import { useAppDispatch } from '@/shared/state/store';
import { Button } from '@/shared/ui';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import { ReactElement } from 'react';
import { useGetPostsQuery } from '@/features/postCreate/api/postsApi';

export default function Page(): ReactElement {
  const {
    isOpen,
    closeModal,
    openModal: openLogoutModal,
    confirmLogout,
  } = useLogout();
  const { data: userData } = useGetMeQuery();
  const { data: postsData, isLoading, error } = useGetPostsQuery();

  // Извлекаем массив постов из items
  const posts = postsData?.items || [];

  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Profile {userData?.email}</h1>
      <LogoutButton openModal={openLogoutModal} />
      <LogoutModal
        open={isOpen}
        userEmail={userData?.email || ''}
        onConfirmed={confirmLogout}
        onCanceled={closeModal}
      />
      <div>
        <Button
          type="button"
          onClick={() => {
            dispatch(openModal({ type: 'post-create' }));
          }}
        >
          Create
        </Button>
      </div>

      <div>
        <h2>Posts</h2>
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error loading posts</p>}
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <img src={post.photos[0]} alt="Post" width={100} />
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
