'use client';

import { useLoginMutation } from '@/features/auth/api/authApi';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogoutModal } from '@/features/auth/ui/login-form/LoginForm';
import { Input } from '@/shared/ui';
import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
import { ReactElement, useState } from 'react';

export default function Home(): ReactElement {
  const { isOpen, openModal, closeModal, confirmLogout, isLoading, isError } =
    useLogout();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loginUser] = useLoginMutation();
  const loginHandler = async () => {
    try {
      await loginUser({ email: login, password: password }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main>Home</main>
      <div>
        <Input value={login} onChange={(e) => setLogin(e.target.value)} />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={loginHandler}>Submit</button>
      </div>
      <LogoutButton openModal={openModal} />
      <LogoutModal
        open={isOpen}
        userEmail={'Test@gmail.com'}
        onConfirmed={confirmLogout}
        onCanceled={closeModal}
      />
    </div>
  );
}
