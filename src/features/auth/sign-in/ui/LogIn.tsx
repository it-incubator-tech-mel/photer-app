// src/features/auth/sign-in/ui/LogIn.tsx
'use client';

import { useLogInForm } from '@/features/auth/sign-in/hooks/useLogInForm';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { OAuthLinks } from '@/shared/ui/oauth/OAuthLinks';
import { Card } from '@/widgets/card/card';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ReactElement } from 'react';

export default function LogIn(): ReactElement {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/profile';

  const {
    register,
    handleSubmit,
    isDirty,
    formErrors,
    isLoading,
    passwordNotSet,
    email,
    errorMessage,
  } = useLogInForm(redirect);

  return (
    <Card
      className={cn(
        'align-center mt-[24px] flex w-full max-w-[378px] flex-col justify-center p-[24px]',
        'max-sm:bg-dark-900 max-sm:border-hidden'
      )}
    >
      <h1 className="h1-text text-center">
        {passwordNotSet ? 'Установка пароля' : 'Sign In'}
      </h1>
      <OAuthLinks />

      <div className="mt-6 flex w-full flex-col justify-center align-middle">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-end"
        >
          {!passwordNotSet && (
            <Input
              className="w-full"
              label="Email"
              errorMessage={formErrors.email?.message}
              {...register('email')}
            />
          )}

          <Input
            type="password"
            className="w-full"
            label={passwordNotSet ? 'Новый пароль' : 'Пароль'}
            placeholder={
              passwordNotSet ? 'Введите новый пароль' : 'Введите пароль'
            }
            errorMessage={formErrors.password?.message}
            {...register('password')}
          />

          {!passwordNotSet && (
            <Link href="/forgot-password" className="text-light-900">
              Forgot Password
            </Link>
          )}

          {passwordNotSet && (
            <p className="mb-2 self-start text-sm text-gray-500">
              Для аккаунта <span className="font-semibold">{email}</span> ещё не
              установлен пароль. Введите его, чтобы установить и войти.
            </p>
          )}

          <Button
            className="my-5 w-full"
            type="submit"
            disabled={
              !isDirty ||
              isLoading ||
              !!formErrors.email?.message ||
              !!formErrors.password?.message
            }
          >
            {passwordNotSet ? 'Установить пароль и войти' : 'Sign In'}
          </Button>

          {errorMessage && (
            <p className="mt-2 self-start text-sm text-red-500">
              {errorMessage}
            </p>
          )}
        </form>

        <p className="regular-text-16 text-center">Don’t have an account?</p>
        <Link
          href="/sign-up"
          className="text-primary-500 mx-auto w-20 p-2 font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </Card>
  );
}
