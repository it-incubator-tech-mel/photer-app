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
  email: string;
};

export const ForgotPasswordForm = ({
  isLoading,
  onSubmit,
  errorMessage,
  email,
}: Props): ReactElement => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    handleSubmit,
    setValue,
    setError,
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const onFormSubmit: SubmitHandler<FormSchemaType> = async ({
    email,
    recaptchaValue,
  }) => {
    await onSubmit({ email, recaptchaValue });
  };

  const handleVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('recoveryPassword');
    setValue('recaptchaValue', token);
    trigger('recaptchaValue');
  }, [executeRecaptcha, setValue, trigger]);

  useEffect(() => {
    handleVerify();
  }, [handleVerify]);

  useEffect(() => {
    if (errorMessage.field === 'Captcha') {
      setError('recaptchaValue', { message: errorMessage.message });
    }
    if (errorMessage.field === 'email') {
      setError('recaptchaValue', { message: errorMessage.message });
    }
    // setError(errorMessage.field as 'email' | 'recaptchaValue', {
    //   message: errorMessage.message,
    // });
  }, [errorMessage, setError]);

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
        {email && (
          <p className={'regular-text-14 text-light-100 mb-4 pt-2'}>
            The link has been sent by email.
            <br /> If you don’t receive an email send link again
          </p>
        )}
        <Button
          className={'w-full'}
          type={'submit'}
          disabled={!isValid || isLoading}
        >
          {email ? 'Send Link Again' : 'Send Link'}
        </Button>
        <Button variant={'text'} className={'my-6 w-full'} asChild>
          <Link href={'/login'}>Back to Sign In</Link>
        </Button>
        {!email && (
          <div id={'recaptcha'} className={'flex justify-center'}></div>
        )}
        <p className={'text-danger-500 text-center'}>
          {errors.recaptchaValue?.message}
        </p>
      </form>
    </Card>
  );
};
