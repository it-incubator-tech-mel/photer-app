'use client';

import {
  useSetPasswordMutation,
  useGetMeQuery,
} from '../../api/authApi.client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/shared/ui/input/Input';
import { Button } from '@/shared/ui/button/Button';

export const SetPasswordForm = () => {
  const router = useRouter();
  const { data: me, isLoading: isMeLoading } = useGetMeQuery();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [setPasswordMutation, { isLoading: isSaving }] =
    useSetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!me?.userId) {
      setError('Ошибка: пользователь не найден');
      return;
    }

    try {
      await setPasswordMutation({ userId: me.userId, password }).unwrap();
      router.push('/profile');
    } catch (err: any) {
      setError(err?.data?.message || 'Ошибка при установке пароля');
    }
  };

  if (isMeLoading) return <p>Загрузка...</p>;

  if (me?.password) {
    return (
      <div className="text-green-700">
        Пароль уже установлен. Теперь вы можете входить через email и пароль.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Установить пароль</h2>

      {error && <div className="text-red-600">{error}</div>}

      <Input
        type="password"
        placeholder="Введите новый пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Установка...' : 'Установить пароль'}
      </Button>
    </form>
  );
};
