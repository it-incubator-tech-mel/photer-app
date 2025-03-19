import { useRouter } from 'next/navigation';
import { logInSchema, LogInSchema } from './validationSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FocusEvent } from 'react';
import { z } from 'zod';
import { useLoginMutation } from '../../api/authApi';

export function useLogInForm() {
  const router = useRouter();
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
    try {
      await loginQuery(data).unwrap();
      reset();
      router.push('/profile');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isDirty,
    hasLoginError: isError,
    formErrors: errors,
    isLoading,
    handleOnBlur,
  };
}
