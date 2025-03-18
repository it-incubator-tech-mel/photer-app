import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpFormData, signUpSchema } from './validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '../../api/authApi';
import { UseSignUpFormReturn } from '../types/useSignUpFormReturn';
import { useModal } from '@/shared/hooks/useModal';

export function useSignUpForm(): UseSignUpFormReturn {
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const { showModal } = useModal();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log('✅ Form submitted:', data);
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    console.log('payload:', payload);
    try {
      await registerUser(payload).unwrap();
      showModal(
        'Sign Up',
        `We have sent a link to confirm your email to ${payload.email}`
      );
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isValid,
    onSubmit,
    isSuccess,
  };
}
