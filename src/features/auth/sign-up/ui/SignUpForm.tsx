'use client';

import { FormFields } from './FormFields';
import { SubmitButton } from './SubmitButton';
import { Card } from '@/widgets/card/card';
import { SocialAuthButtons } from './SocialAuthButtons';
import { useSignUpForm } from '../hooks/useSignUpForm';

export default function SignUpForm(): React.ReactElement {
  const { register, handleSubmit, control, errors, isValid, onSubmit } =
    useSignUpForm();

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
