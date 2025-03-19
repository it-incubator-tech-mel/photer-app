'use client';

import { useLogInForm } from '@/features/auth/sign-in/hooks/useLogInForm';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { Card } from '@/widgets/card/card';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function LogIn(): ReactElement {
  const {
    register,
    handleSubmit,
    isDirty,
    hasLoginError,
    formErrors,
    isLoading,
    handleOnBlur,
  } = useLogInForm();
  return (
    <Card
      className={cn(
        'align-center mt-[24px] flex w-full max-w-[378px] flex-col justify-center p-[24px]',
        'max-sm:bg-dark-900 max-sm:border-hidden'
      )}
    >
      <h1 className="h1-text text-center">Sign In</h1>
      <div className="mt-[13px] flex justify-center gap-15">
        {/* TODO OAuth */}
      </div>
      <div className="mt-6 flex w-full flex-col justify-center align-middle">
        <form onSubmit={handleSubmit} className={'flex flex-col items-end'}>
          {hasLoginError && (
            <p className={'text-danger-500 text-center'}>
              The email or password are incorrect. Try again please
            </p>
          )}
          <Input
            className="w-full"
            label={'Email'}
            errorMessage={formErrors.email?.message}
            {...register('email', { onBlur: handleOnBlur })}
          />
          <Input
            type="password"
            className="w-full"
            label={'Password'}
            errorMessage={formErrors.password?.message}
            {...register('password', {
              onBlur: handleOnBlur,
            })}
          />
          {/* TODO добавить ссылку на Forgot Password */}
          <Link href="/" className={'text-light-900'}>
            Forgot Password
          </Link>
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
            Sign In
          </Button>
        </form>
        <p className="regular-text-16 text-center">Don’t have an account? </p>
        <Link
          href="/sign-up"
          className={
            'text-primary-500 text-accent-500 mx-auto w-20 p-2 font-semibold'
          }
        >
          Sign Up
        </Link>
      </div>
    </Card>
  );
}
