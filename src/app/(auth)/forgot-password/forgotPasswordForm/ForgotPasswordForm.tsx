import { Input } from '@/components/input/Input';
import { Button } from '@/components/button/Button';
import Link from 'next/link';
import { ReactElement, useCallback, useEffect } from 'react';
import {
  ForgotPasswordFormSchema,
  FormSchemaType,
} from '@/app/(auth)/forgot-password/forgotPasswordForm/forgotPasswordFormSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components';
import { ErrorMessage } from '@/app/(auth)/forgot-password/page';

type Props = {
  isLoading: boolean;
  onSubmit: SubmitHandler<FormSchemaType>;
  errorMessage: ErrorMessage;
};

export const ForgotPasswordForm = ({
  isLoading,
  onSubmit,
  errorMessage,
}: Props): ReactElement => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    handleSubmit,
    setValue,
    setError,
    reset,
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  useEffect(() => {
    setError(errorMessage.field as 'email' | 'recaptcha', {
      message: errorMessage.message,
    });
  }, [errorMessage, setError]);

  const onFormSubmit: SubmitHandler<FormSchemaType> = ({
    email,
    recaptcha,
  }) => {
    onSubmit({ email, recaptcha });
    reset();
  };

  const handleVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('recoveryPassword');
    setValue('recaptcha', token);
    trigger('recaptcha');
  }, [executeRecaptcha, setValue, trigger]);

  useEffect(() => {
    handleVerify();
  }, [handleVerify]);
  return (
    <Card className={'max-w-sm p-6'}>
      <h1 className={'h1-text mb-9 text-center'}>Forgot Password</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
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
        <Button
          className={'w-full'}
          type={'submit'}
          disabled={!isValid || isLoading}
        >
          Send Link
        </Button>
        <Button variant={'text'} className={'my-6 w-full'} asChild>
          <Link href={'/login'}>Back to Sign In</Link>
        </Button>
      </form>
    </Card>
  );
};
