'use client';

import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import Link from 'next/link';
import { ReactElement, FocusEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLoginMutation } from '@/store/services/auth/authApi';
import router from 'next/router';
import { OAuth } from '@/components/OAuth/OAuth';

const logInSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(8, 'The password must contain at least 6 characters')
    .nonempty('Password is required'),
});

type LogInSchema = z.infer<typeof logInSchema>;

export default function LogIn(): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty, errors },
  } = useForm<LogInSchema>({ resolver: zodResolver(logInSchema) });

  const [loginQuery, { isLoading, isError }] = useLoginMutation();

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof LogInSchema;
    try {
      const mask = { [fieldName]: true } as { [K in keyof LogInSchema]?: true };
      logInSchema.pick(mask).parse({ [fieldName]: e.target.value });
      setError(fieldName, { message: '' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(fieldName, { message: err.errors[0].message });
      }
    }
  };

  const onSubmit = async (data: LogInSchema) => {
    console.log('onSubmit');
    console.log(data);
    try {
      const result = await loginQuery(data).unwrap();
      reset();
      console.log('Login successful:', result);
      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
      console.error('The email or password are incorrect. Try again please');
    }
  };

  return (
    <>
      <h1 className="h1-text text-center">Sign In</h1>
      <div className="mt-[13px] flex justify-center gap-15">
        <OAuth service="google" />
        <OAuth service="github" />
      </div>
      <div className="mt-6 flex w-full flex-col justify-center align-middle">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={'flex flex-col items-end'}
        >
          {isError && (
            <p className={'text-danger-500 text-center'}>
              The email or password are incorrect. Try again please
            </p>
          )}
          <Input
            className="w-full"
            label={'Email'}
            errorMessage={errors.email?.message}
            {...(register('email'), { onBlur: handleOnBlur, name: 'email' })}
          />
          <Input
            type="password"
            className="w-full"
            label={'Password'}
            errorMessage={errors.password?.message}
            {...(register('password'),
            { onBlur: handleOnBlur, name: 'password' })}
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
              !!errors.email?.message ||
              !!errors.password?.message
            }
          >
            Sign In
          </Button>
        </form>
        <p className="regular-text-16 text-center">Don’t have an account? </p>
        {/* TODO добавить ссылку на Sign Up */}
        <Link href="/" className={'mx-auto w-20 p-2'}>
          Sign Up
        </Link>
      </div>
    </>
  );
}
