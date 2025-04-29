'use client';
import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
import { Button } from '@/shared/ui';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  const { data } = useGetMeQuery();
  const { isOpen, openModal, closeModal, confirmLogout } = useLogout();
  return (
    <div>
      <main>
        {data ? (
          <div className="flex flex-col gap-2">
            <div>Hello {data.email}</div>
            <Link href={`/profile/${data.userId}`}>Open my profile </Link>
            <LogoutButton openModal={openModal} />
            <LogoutModal
              open={isOpen}
              userEmail={''}
              onConfirmed={confirmLogout}
              onCanceled={closeModal}
            />
          </div>
        ) : (
          <div>
            Вы не вошли в систему или ваша сессия истекла, авторизуйтесь
            пожалуйста{' '}
            <Button asChild variant={'text'}>
              <Link href="/sign-in">Войти</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
