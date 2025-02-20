import { Input } from '@/components/input/Input';
import { Button } from '@/components/button/Button';
import Link from 'next/link';
import { ReactElement } from 'react';
import { FormSchemaType } from '@/app/(auth)/forgot-password/forgotPasswordForm/forgotPasswordFormSchema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
  isValid: boolean;
};

export const ForgotPasswordForm = ({
  register,
  errors,
  isValid,
}: Props): ReactElement => {
  return (
    <>
      <Input
        type={'email'}
        label={'Email'}
        placeholder={'Epam@epam.com'}
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      <p className={'regular-text-14 text-light-900 mb-4'}>
        Enter your email address and we will send you further instructions
      </p>
      <Button className={'w-full'} type={'submit'} disabled={!isValid}>
        Send Link
      </Button>
      <Button variant={'text'} className={'my-6 w-full'} asChild>
        <Link href={'/login'}>Back to Sign In</Link>
      </Button>
    </>
  );
};
