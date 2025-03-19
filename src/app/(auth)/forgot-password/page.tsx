'use client';
import { ReactElement, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { FormSchemaType } from '@/features/forgot-password/types/forgotPasswordFormSchema';
import { ForgotPasswordForm } from '@/features/forgot-password/ui/ForgotPasswordForm';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Button } from '@/shared/ui';
import { Modal } from '@/widgets/modal/Modal';
import { usePasswordRecoveryMutation } from '@/features/auth/api/authApi';

export type ErrorMessage = {
  field: string;
  message: string;
};
type Error404Type = {
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
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
    recaptchaValue,
  }) => {
    try {
      await recoveryPassword({ email, recaptchaValue }).unwrap();
      setEmail(email);
      setIsFormSend(true);
    } catch (e) {
      const er = e as { data: Error404Type };
      if (er.data.statusCode === 404) {
        setErrorMessage({
          field: 'email',
          message: "User with this email doesn't exist",
        });
      }
      const error = e as { data: { errorsMessages: ErrorMessage[] } };
      if (Array.isArray(error.data.errorsMessages)) {
        setErrorMessage(error.data.errorsMessages[0]);
      }
      console.log(e);
    }
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={'6LeZReQqAAAAAJ-4OO2JYFnhUGFbeCdiBjlJ56kj'}
      container={{
        element: 'recaptcha',
        parameters: { theme: 'dark' },
      }}
    >
      <ForgotPasswordForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        email={email}
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
