'use client';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoginMutation } from '../../api/authApi';
import { decodeJwt } from '@/shared/lib/decodeJwt';
import { LogInSchema, logInSchema } from './validationSchema';

export function useLogInForm(): {
  register: ReturnType<typeof useForm<LogInSchema>>['register'];
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isDirty: boolean;
  hasLoginError: boolean;
  formErrors: ReturnType<typeof useForm<LogInSchema>>['formState']['errors'];
  isLoading: boolean;
} {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<LogInSchema>({
    resolver: zodResolver(logInSchema),
    mode: 'onBlur',
  });
  const [loginQuery, { isLoading, isError }] = useLoginMutation();

  const onSubmit: SubmitHandler<LogInSchema> = async (
    data: LogInSchema
  ): Promise<void> => {
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
