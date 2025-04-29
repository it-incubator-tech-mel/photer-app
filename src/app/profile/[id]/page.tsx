'use client';
import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function Page(): ReactElement {
  const { isOpen, openModal, closeModal, confirmLogout } = useLogout();
  const { data } = useGetMeQuery();

  return (
    <div>
      <Link href="/">Go home</Link>
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
