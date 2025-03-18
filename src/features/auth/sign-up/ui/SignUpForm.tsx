'use client';

import { FormFields } from './FormFields';
import { SubmitButton } from './SubmitButton';
import { Card } from '@/widgets/card/card';
import { SocialAuthButtons } from './SocialAuthButtons';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { SignUpPrompt } from './SignUpPrompt';
import { EmailSentModal } from './EmailSentModal';

export default function SignUpForm(): React.ReactElement {
  const formState = useSignUpForm();
  const onFormSubmit = formState.handleSubmit(formState.onSubmit);

  return (
    <Card className="m-auto mt-6 flex min-h-162 w-[378px] flex-col items-center">
      <h1 className="h1-text mt-[23px]">Sign Up</h1>
      <SocialAuthButtons
        onGoogleClick={() => console.log('google registration')}
        onGithubClick={() => console.log('github registration')}
      />
      <form onSubmit={onFormSubmit} className="w-full px-6">
        <FormFields
          register={formState.register}
          errors={formState.errors}
          control={formState.control}
        />
        <SubmitButton isValid={formState.isValid} text={'Sign Up'} />
        <SignUpPrompt
          promptText={'Do you have an account?'}
          buttonText={'Sign In'}
          href={'/sign-in'}
        />
      </form>
      <EmailSentModal
        email={formState.userData?.email || ''}
        open={formState.isSuccess}
        onClose={() => formState.setIsSuccess(false)}
      />
    </Card>
  );
}
