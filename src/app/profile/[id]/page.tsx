'use client';

import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import { ReactElement } from 'react';

export default function Page(): ReactElement {
  const { isOpen, openModal, closeModal, confirmLogout } = useLogout();

  return (
    <div>
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
