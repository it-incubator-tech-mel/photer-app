'use client';

import { Button } from '@/components/button/Button';
import { IconSprite } from '@/components/icon/IconSprite';
import { Input } from '@/components/input/Input';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLoginMutation } from '@/store/services/auth/authApi';

const logInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  // .min(8, 'The password must contain at least 6 characters'),
});

type LogInSchema = z.infer<typeof logInSchema>;

export default function LogIn(): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    //@ts-ignore
  } = useForm<LogInSchema>({ resolver: zodResolver(logInSchema) });

  const { isLoading } = useLoginMutation();

  const onSubmit = async (data: LogInSchema) => {
    try {
      const result = await mutate(data).unwrap(); // unwrap для получения результата
      console.log('Login successful:', result);
    } catch (err) {
      console.error('Login failed:', err);
    }
    reset();
  };

  return (
    <>
      <h1 className="h1-text text-center">Sign Up</h1>
      <div className="mt-[13px] flex justify-center gap-15">
        <IconSprite iconName="google" width="36" height="36" />
        <IconSprite iconName="github" width="36" height="36" />
      </div>
      <div className="mt-6 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full"
            label={'Email'}
            errorMessage={errors.email?.message}
            {...register('email')}
          />
          <Input
            type="password"
            className="w-full"
            label={'Password'}
            errorMessage={errors.password?.message}
            {...register('password')}
          />
          {/* TODO добавить ссылку на Forgot Password */}
          <Link href="/" className="text-light-900 ml-auto">
            Forgot Password
          </Link>{' '}
          <Button className="my-5 w-full">Sign In</Button>
        </form>
        <p className="regular-text-16 text-center">Don’t have an account? </p>
        <Button variant="text" className="mt-1 w-full">
          Sign Up
        </Button>
      </div>
    </>
  );
}
