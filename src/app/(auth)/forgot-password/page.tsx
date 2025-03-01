'use client';
import { ReactElement, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { FormSchemaType } from '@/app/(auth)/forgot-password/forgotPasswordForm/forgotPasswordFormSchema';
import { ForgotPasswordForm } from '@/app/(auth)/forgot-password/forgotPasswordForm/ForgotPasswordForm';
import { Modal } from '@/components/modal/Modal';
import { Button } from '@/components/button/Button';
import { usePasswordRecoveryMutation } from '@/store/services/auth/authApi';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export type ErrorMessage = {
  field: string;
  message: string;
};

export default function ForgotPasswordPage(): ReactElement {
  const [recoveryPassword, { isLoading }] = usePasswordRecoveryMutation();
  const [email, setEmail] = useState('');
  const [isFormSend, setIsFormSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState({} as ErrorMessage);

  const onModalClose = (): void => {
    setIsFormSend(false);
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async ({
    email,
    recaptcha,
  }) => {
    try {
      await recoveryPassword({ email, recaptcha }).unwrap();
      setEmail(email);
      setIsFormSend(true);
    } catch (e) {
      const error = e as { errorsMessages: ErrorMessage };
      if (Array.isArray(error.errorsMessages)) {
        setErrorMessage(error.errorsMessages[0]);
      }
      console.error(e);
    }
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={'6LeZReQqAAAAAJ-4OO2JYFnhUGFbeCdiBjlJ56kj'}
      container={{
        parameters: { theme: 'dark', badge: 'bottomleft' },
      }}
    >
      <ForgotPasswordForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />
      <Modal
        open={isFormSend}
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
    </GoogleReCaptchaProvider>
  );
}
