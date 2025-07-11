// src/features/auth/sign-in/hooks/useLogInForm.ts
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  useLoginMutation,
  useSetPasswordMutation,
} from '../../api/authApi.client';

type FormValues = {
  email: string;
  password: string;
};

export const useLogInForm = (redirect = '/profile') => {
  const router = useRouter();

  const [login, loginResult] = useLoginMutation();
  const [setPassword, setPasswordResult] = useSetPasswordMutation();

  const {
    register,
    handleSubmit: rawHandleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<FormValues>();

  const [passwordNotSet, setPasswordNotSet] = useState(false);
  const [userIdForSetPassword, setUserIdForSetPassword] = useState<
    number | null
  >(null);
  const [emailForLogin, setEmailForLogin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = rawHandleSubmit(async (data) => {
    console.log('📥 Submitted form:', data);
    setErrorMessage('');

    try {
      if (passwordNotSet) {
        console.log('⚙️ Пароль ещё не установлен. Устанавливаем...');

        if (!userIdForSetPassword) {
          console.error('❌ Не указан userId для установки пароля');
          setErrorMessage('Ошибка при установке пароля. Попробуйте снова.');
          return;
        }

        console.log('🟡 Sending setPassword:', {
          userId: userIdForSetPassword,
          password: data.password,
        });

        console.log('🔑 Отправка запроса на setPassword:', {
          userId: userIdForSetPassword,
          password: data.password,
        });

        await setPassword({
          userId: userIdForSetPassword,
          password: data.password,
        }).unwrap();

        console.log('✅ Пароль успешно установлен. Переходим к логину');

        await login({
          email: emailForLogin,
          password: data.password,
        }).unwrap();

        console.log('✅ Успешный вход после установки пароля');
        toast.success('Пароль установлен и вход выполнен');
        router.push(redirect);
        return;
      }

      // Обычный вход
      console.log('🔐 Обычный логин:', data);
      await login(data).unwrap();

      console.log('✅ Успешный логин');
      toast.success('Вы успешно вошли!');
      router.push(redirect);
    } catch (error: any) {
      console.log('❌ Ошибка логина:', error);

      console.log('🪵 Полный объект ошибки:', JSON.stringify(error, null, 2));
      const code =
        error?.data?.error ||
        error?.data?.message?.error ||
        error?.data?.message ||
        error?.message;
      console.log('📩 Извлечённый код ошибки:', code);

      if (code === 'PASSWORD_NOT_SET') {
        console.log(
          '⚠️ Пароль не установлен, переключаемся на режим установки'
        );

        const userId = error?.data?.userId;
        if (!userId) {
          console.error('❌ Нет userId в ответе от сервера');
          setErrorMessage('Ошибка входа: отсутствует userId');
          return;
        }

        setPasswordNotSet(true);
        setUserIdForSetPassword(userId);
        setEmailForLogin(data.email);
        setErrorMessage('У этого аккаунта ещё не установлен пароль.');
        reset({ password: '' });
        return;
      }

      if (code === 'Unauthorized') {
        setErrorMessage('Неверный email или пароль');
        return;
      }

      setErrorMessage('Ошибка входа. Попробуйте позже');
    }
  });

  return {
    register,
    handleSubmit,
    formErrors: errors,
    isDirty,
    isLoading: loginResult.isLoading || setPasswordResult.isLoading,
    passwordNotSet,
    email: emailForLogin,
    errorMessage,
  };
};
