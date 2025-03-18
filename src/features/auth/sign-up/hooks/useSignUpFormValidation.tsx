import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SignUpFormData, signUpSchema } from './validationSchema';
import { UseSignUpFormValidationReturn } from '../types/useSignUpFormReturn';

export function useSignUpFormValidation(): UseSignUpFormValidationReturn {
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

  return {
    register,
    handleSubmit,
    control,
    setError,
    errors,
    isValid,
  };
}
