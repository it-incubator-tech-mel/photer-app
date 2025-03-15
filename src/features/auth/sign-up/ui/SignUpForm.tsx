'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormFields } from './FormFields';
import { SubmitButton } from './SubmitButton';
import { Card } from '@/widgets/card/card';
import { SignUpFormData, signUpSchema } from '../hooks/validationSchema';
import { SocialAuthButtons } from './SocialAuthButtons';
import { useState } from 'react';
import { ConfirmEmail } from './ConfirmEmail';
import { ResendEmail } from './ResendEmail';

export default function SignUpForm(): React.ReactElement {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignUpFormData): void => {
    console.log('✅ Form submitted:', data);
    setIsSuccess(true);
  };
  if (isSuccess) {
    return (
      <>
        <ConfirmEmail />
        <ResendEmail />
      </>
    );
  }

  return (
    <Card className="m-auto mt-6 flex min-h-162 w-[378px] flex-col items-center">
      <h1 className="h1-text mt-[23px]">Sign Up</h1>
      <SocialAuthButtons
        onGoogleClick={() => console.log('google registration')}
        onGithubClick={() => console.log('github registration')}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-6">
        <FormFields register={register} errors={errors} control={control} />
        <SubmitButton isValid={isValid} text={'Sign Up'} />
      </form>
    </Card>
  );
}
