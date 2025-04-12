'use client';

import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
import { openModal } from '@/shared/state/slices/modalSlice';

import { useAppDispatch } from '@/shared/state/store';
import { Button } from '@/shared/ui';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import { ReactElement } from 'react';

export default function Page(): ReactElement {
  const {
    isOpen,
    closeModal,
    openModal: openLogoutModal,
    confirmLogout,
  } = useLogout();
  const { data } = useGetMeQuery();

  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Profile {data?.email}</h1>
      <LogoutButton openModal={openLogoutModal} />
      <LogoutModal
        open={isOpen}
        userEmail={''}
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
          Create Post
        </Button>
      </div>
    </div>
  );
}
