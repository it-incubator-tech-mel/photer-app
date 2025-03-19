'use client';
import { useRouter } from 'next/navigation';
import { logInSchema, LogInSchema } from './validationSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FocusEvent } from 'react';
import { z } from 'zod';
import { useLoginMutation } from '../../api/authApi';
import { decodeJwt } from '@/shared/lib/decodeJwt';

export function useLogInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty, errors },
  } = useForm<LogInSchema>({
    resolver: zodResolver(logInSchema),
    mode: 'onBlur',
  });
  const [loginQuery, { isLoading, isError }] = useLoginMutation();

  const onSubmit = async (data: LogInSchema) => {
    try {
      const result = await loginQuery(data).unwrap();

      reset();
      const accessToken = result.accessToken;
      const payload = decodeJwt(accessToken);
      const userId = payload.userId || payload.sub;

      router.push(`/profile/${userId}`);
    } catch (err) {
      console.log('Login failed:', err);
    }
  };
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isDirty,
    hasLoginError: isError,
    formErrors: errors,
    isLoading,
  };
}
