// src/features/auth/sign-in/hooks/useLogInForm.ts

import { useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export const useLogInForm = (onSubmit?: (data: FormValues) => void) => {
  const {
    register,
    handleSubmit: rawHandleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormValues>();

  const handleSubmit = rawHandleSubmit((data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  });

  return {
    register,
    handleSubmit,
    formErrors: errors,
    isDirty,
    isLoading: false, // сюда можно подключить loading из rtk-query, если хочешь
    hasLoginError: false, // можно связать с ошибкой из запроса
  };
};
