'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactElement } from 'react';
import { Input } from '@/components/input/Input';
import { Card } from '@/components';
import { Button } from '@/components/button/Button';
import {
  RecoveryPasswordFormSchema,
  RecoveryPasswordFormSchemaType,
} from '@/app/(auth)/recovery-password/recoveryPasswordForm/recoveryPasswordFormShcema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RecoveryPasswordPage(): ReactElement {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<RecoveryPasswordFormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(RecoveryPasswordFormSchema),
  });

  const onFormSubmit: SubmitHandler<RecoveryPasswordFormSchemaType> = (
    data
  ) => {
    const { password } = data;
    console.log(password);
  };
  return (
    <Card className={'min-w-sm p-6'}>
      <h1 className={'h1-text mb-9 text-center'}>Create New Password</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          type={'password'}
          label={'New password'}
          {...register('password')}
          errorMessage={errors.password?.message}
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
        <Button className={'mb-3 w-full'} type={'submit'} disabled={!isValid}>
          Create new password
        </Button>
      </form>
    </Card>
  );
}
