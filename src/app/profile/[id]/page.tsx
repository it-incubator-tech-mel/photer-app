'use client';

import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';

import { useAppDispatch } from '@/shared/state/store';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import { ReactElement } from 'react';
import { openModal as openModalAction } from '@/shared/state/slices/modalSlice';
import { openPostModal } from '@/shared/state/slices/postSlice';

export default function Page(): ReactElement {
  const { isOpen, openModal, closeModal, confirmLogout } = useLogout();
  const { data } = useGetMeQuery();
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Profile {data?.email}</h1>
      <LogoutButton openModal={openModal} />
      <LogoutModal
        open={isOpen}
        userEmail={''}
        onConfirmed={confirmLogout}
        onCanceled={closeModal}
      />
      <div>
        <button
          onClick={() => {
            dispatch(openModalAction({ type: 'post-create' }));
            dispatch(openPostModal());
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}
