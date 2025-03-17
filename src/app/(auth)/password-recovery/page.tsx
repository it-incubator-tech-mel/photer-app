'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactElement, useState } from 'react';
import { Input } from '@/components/input/Input';
import { Card } from '@/components';
import { Button } from '@/components/button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNewPasswordMutation } from '@/store/services/auth/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorMessage } from '@/app/(auth)/forgot-password/page';
import {
  RecoveryPasswordFormSchema,
  RecoveryPasswordFormSchemaType,
} from '@/app/(auth)/password-recovery/recoveryPasswordForm/recoveryPasswordFormShcema';

export default function RecoveryPasswordPage(): ReactElement {
  const searchParams = useSearchParams();
  const recoveryCode = searchParams.get('recoveryCode') as string;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState({} as ErrorMessage);
  const [createNewPassword, { isLoading }] = useNewPasswordMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<RecoveryPasswordFormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(RecoveryPasswordFormSchema),
  });

  const onFormSubmit: SubmitHandler<RecoveryPasswordFormSchemaType> = async (
    data
  ) => {
    const { newPassword } = data;
    try {
      await createNewPassword({ newPassword, recoveryCode }).unwrap();
      router.push('/login');
    } catch (e) {
      const error = e as { data: { errorsMessages: ErrorMessage[] } };
      if (Array.isArray(error.data.errorsMessages)) {
        setErrorMessage(error.data.errorsMessages[0]);
        if (
          error.data.errorsMessages[0].message === 'Recovery code has expired'
        ) {
          router.push('/resend-link');
        }
      }
      console.log(e);
    }
  };

  return (
    <Card className={'min-w-sm p-6'}>
      <h1 className={'h1-text mb-9 text-center'}>Create New Password</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          type={'password'}
          label={'New password'}
          {...register('newPassword')}
          errorMessage={errors.newPassword?.message}
        />
        <Input
          type={'password'}
          label={'Password confirmation'}
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
        <p className={'regular-text-14 text-light-900 mb-10'}>
          Your password must be between 6 and 20 characters
        </p>
        <Button
          className={'mb-3 w-full'}
          type={'submit'}
          disabled={!isValid || isLoading}
        >
          Create new password
        </Button>
        {errorMessage && <span>{errorMessage.message}</span>}
      </form>
    </Card>
  );
}
