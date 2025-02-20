'use client';
import { ReactElement, useRef, useState } from 'react';
import { Card } from '@/components';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ForgotPasswordFormSchema,
  FormSchemaType,
} from '@/app/(auth)/forgot-password/forgotPasswordForm/forgotPasswordFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordForm } from '@/app/(auth)/forgot-password/forgotPasswordForm/ForgotPasswordForm';
import { Modal } from '@/components/modal/Modal';
import { Button } from '@/components/button/Button';

export default function ForgotPasswordPage(): ReactElement {
  const reCaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalClose = (): void => {
    setIsModalOpen(false);
  };

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
    setEmail(email);
    reset();
    reCaptchaRef.current?.reset();
    setIsModalOpen(true);
  };
  return (
    <Card className={'max-w-sm p-6'}>
      <h1 className={'h1-text mb-9 text-center'}>Forgot Password</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <ForgotPasswordForm
          errors={errors}
          register={register}
          isValid={isValid}
        />
        <Controller
          render={({ field }) => (
            <ReCAPTCHA
              {...field}
              sitekey={'6Ldd-9YqAAAAAIW0yWxfHAqcOOMdElboBEOOj4Bc'}
              theme={'dark'}
              ref={reCaptchaRef}
              className={'flex justify-center'}
            />
          )}
          name={'recaptcha'}
          control={control}
        />
        {errors.recaptcha && (
          <span className={'text-danger-500'}>{errors.recaptcha.message}</span>
        )}
      </form>
      <Modal
        open={isModalOpen}
        onClose={onModalClose}
        title={'Email sent'}
        size={'sm'}
      >
        <div className={'flex flex-col'}>
          <p>{`We have sent a link to confirm your email to ${email}`}</p>
          <Button className={'mt-5 w-min self-end'} onClick={onModalClose}>
            OK
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
