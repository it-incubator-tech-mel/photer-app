import { useForm } from 'react-hook-form';
import { SignUpFormData } from '../hooks/validationSchema';

export type UseSignUpFormReturn = {
  register: ReturnType<typeof useForm<SignUpFormData>>['register'];
  handleSubmit: ReturnType<typeof useForm<SignUpFormData>>['handleSubmit'];
  control: ReturnType<typeof useForm<SignUpFormData>>['control'];
  errors: ReturnType<typeof useForm<SignUpFormData>>['formState']['errors'];
  isValid: boolean;
  onSubmit: (data: SignUpFormData) => void;
  isSuccess: boolean;
};
