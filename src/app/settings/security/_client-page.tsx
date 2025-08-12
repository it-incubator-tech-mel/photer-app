'use client';

import { SetPasswordForm } from '@/features/auth/set-password/ui/SetPasswordForm';
import { useGetMeQuery } from '@/features/auth/api/authApi.client';
import { Spinner } from '@/shared/ui';

export default function SecuritySettingsPageClient() {
  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) return <Spinner />;
  if (!user) {
    return <p className="text-red-500">Ошибка: пользователь не найден</p>;
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Безопасность</h1>

      {user.password === null ? (
        <>
          <p className="mb-4 text-gray-500">
            У вас не установлен пароль. Вы можете задать его ниже.
          </p>
          <SetPasswordForm />
        </>
      ) : (
        <p className="text-green-600">
          Пароль уже установлен. Вы можете изменить его или воспользоваться
          восстановлением.
        </p>
      )}
    </main>
  );
}
