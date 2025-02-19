'use client';
import { ReactElement, useRef } from 'react';
import { Card } from '@/components';
import { Input } from '@/components/input/Input';
import { Button } from '@/components/button/Button';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ForgotPasswordFormSchema,
  FormSchemaType,
} from '@/app/(auth)/forgot-password/forgotPasswordFormSchema/forgotPasswordFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ForgotPasswordPage(): ReactElement {
  const reCaptchaRef = useRef<ReCAPTCHA | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const onFormSubmit: SubmitHandler<FormSchemaType> = ({
    email,
    recaptcha,
  }): void => {
    console.log(email, recaptcha);
    reset();
    reCaptchaRef.current?.reset();
  };
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
        <p className={'regular-text-14 text-light-900'}>
          Enter your email address and we will send you further instructions
        </p>
        <div className={'mt-4 flex flex-col items-center gap-6'}>
          <Button className={'w-full'} type={'submit'} disabled={!isValid}>
            Send Link
          </Button>
          <Button variant={'text'} className={'w-full'} asChild>
            <Link href={'/login'}>Back to Sign In</Link>
          </Button>
          <Controller
            render={({ field }) => (
              <ReCAPTCHA
                {...field}
                sitekey={'6Ldd-9YqAAAAAIW0yWxfHAqcOOMdElboBEOOj4Bc'}
                theme={'dark'}
                ref={reCaptchaRef}
              />
            )}
            name={'recaptcha'}
            control={control}
          />
        </div>
      </form>
    </Card>
  );
}
