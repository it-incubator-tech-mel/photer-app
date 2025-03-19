'use client';
import timeImage from 'public/images/time.png';
import Image from 'next/image';
import { ReactElement, useCallback, useState } from 'react';
import { Button } from '@/shared/ui';
import { usePasswordRecoveryMutation } from '@/features/auth/api/authApi';
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import { ErrorMessage } from '@/app/(auth)/forgot-password/page';
import { toast } from 'react-toastify';

export default function ResendLink(): ReactElement {
  const [resendLink, { isLoading }] = usePasswordRecoveryMutation();
  const [token, setToken] = useState('');
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);

  const onVerify = useCallback((token: string) => {
    setToken(token);
  }, []);

  const handleResendLink = async (): Promise<void> => {
    try {
      await resendLink({
        email: localStorage.getItem('email') as string,
        recaptchaValue: token,
      }).unwrap();
      localStorage.removeItem('email');
      setRefreshCaptcha((prevState) => !prevState);
    } catch (e) {
      const error = e as { data: { errorsMessages: ErrorMessage[] } };
      if (Array.isArray(error.data.errorsMessages)) {
        toast(error.data.errorsMessages[0].message, { type: 'error' });
      }
      console.log(e);
    }
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={'6LeZReQqAAAAAJ-4OO2JYFnhUGFbeCdiBjlJ56kj'}
    >
      <div className={'max-w-74 text-center'}>
        <h1 className={'h1-text'}>Email verification link expired</h1>
        <p className={'regular-text-16 mb mt-5 mb-7'}>
          Looks like the verification link has expired. Not to worry, we can
          send the link again
        </p>
        <Button
          className={'w-full'}
          onClick={handleResendLink}
          disabled={isLoading}
        >
          Resend link
        </Button>
      </div>
      <Image src={timeImage} alt={'time'} width={470} />
      <GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshCaptcha} />
    </GoogleReCaptchaProvider>
  );
}
