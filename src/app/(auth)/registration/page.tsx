'use client';

import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Card, IconSprite } from '@/components';
import Link from 'next/link';

const schema = z
  .object({
    username: z
      .string()
      .min(6, 'Username must be at least 6 characters')
      .max(30, 'Username must be at most 30 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, underscores, and hyphens'
      ),
    email: z
      .string()
      .email('The email must match the format example@example.com'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(30, 'Maximum number of characters 30')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,30}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
      ),
    terms: z.boolean().refine((val) => val, {
      message: 'You must accept the terms',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords must match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function Page(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data: z.infer<typeof schema>): void => {
    console.log('✅ Form submitted:', data);
  };

  return (
    <>
      <Card className="m-auto mt-6 flex min-h-162 w-[378px] flex-col items-center">
        <h1 className="h1-text mt-[23px]">Sign Up</h1>

        <div className="mt-[13px] flex gap-15">
          <IconSprite
            iconName="google"
            width="36"
            height="36"
            className="fill-red-500"
          />
          <IconSprite
            iconName="github"
            width="36"
            height="36"
            className="fill-white"
          />
        </div>
        <div className="m-6 mx-auto w-[330px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              className="w-[330px]"
              label="Username"
              errorMessage={errors.username?.message}
              {...register('username')}
              autoComplete="username"
            />
            <Input
              className="w-[330px]"
              type="email"
              label="Email"
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <Input
              className="w-[330px]"
              type="password"
              label="Password"
              errorMessage={errors.password?.message}
              {...register('password')}
              autoComplete="new-password"
            />
            <Input
              className="w-[330px]"
              type="password"
              label="Password confirmation"
              errorMessage={errors.confirmPassword?.message}
              {...register('confirmPassword')}
              autoComplete="new-password"
            />
            <div className="flex items-center justify-center gap-3">
              <input
                {...register('terms')}
                type="checkbox"
                className="h-4 w-4"
              />
              <label htmlFor="terms" className="small-text">
                I agree to the{' '}
                <Link
                  href="/terms-of-service"
                  className="text-accent-300 underline"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-policy"
                  className="text-accent-300 underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            <Button
              className="my-5 w-[330px]"
              disabled={!isValid}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <p className="regular-text-16 text-center">Do you have an account?</p>
          <Link href="/login">
            <Button variant="text" className="mt-1 w-[330px]">
              Sign In
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
