'use client';
import { ReactElement, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { usePasswordRecoveryMutation } from '@/features/auth/api/authApi';
import { useModal } from '@/shared/hooks/useModal';
import { ForgotPasswordForm } from '@/features/auth/forgot-password/ui/ForgotPasswordForm';
import { FormSchemaType } from '@/features/auth/forgot-password/types/forgotPasswordFormSchema';

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
  const [isFormSend, setIsFormSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState({} as ErrorMessage);
  const { showModal } = useModal();

  const onSubmit: SubmitHandler<FormSchemaType> = async ({
    email,
    recaptchaValue,
  }) => {
    try {
      await recoveryPassword({ email, recaptchaValue }).unwrap();
      setIsFormSend(true);
      showModal(
        'Email sent',
        `We have sent a link to confirm your email to ${email}`
      );
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
    <>
      <ForgotPasswordForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        isFormSend={isFormSend}
      />
    </>
  );
}
