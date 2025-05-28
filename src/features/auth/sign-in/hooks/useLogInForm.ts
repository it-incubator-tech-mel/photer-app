// // src/features/auth/sign-in/hooks/useLogInForm.ts
// 'use client';

// import { useRouter } from 'next/navigation';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// import { useLoginMutation } from '../../api/authApi';
// import { decodeJwt } from '@/shared/lib/decodeJwt';
// import { LogInSchema, logInSchema } from './validationSchema';

// export function useLogInForm(): {
//   register: ReturnType<typeof useForm<LogInSchema>>['register'];
//   handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
//   isDirty: boolean;
//   hasLoginError: boolean;
//   formErrors: ReturnType<typeof useForm<LogInSchema>>['formState']['errors'];
//   isLoading: boolean;
// } {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { isDirty, errors },
//   } = useForm<LogInSchema>({
//     resolver: zodResolver(logInSchema),
//     mode: 'onBlur',
//   });

//   const [loginQuery, { isLoading, isError }] = useLoginMutation();

//   const onSubmit: SubmitHandler<LogInSchema> = async (data) => {
//     try {
//       const result = await loginQuery(data).unwrap();

//       // НЕ сохраняем токен в localStorage
//       reset();

//       const accessToken = result.accessToken;
//       const payload = decodeJwt(accessToken);
//       const userId = payload.userId || payload.sub;

//       router.push(`/profile/${userId}`);
//     } catch (err) {
//       console.log('Login failed:', err);
//     }
//   };

//   return {
//     register,
//     handleSubmit: handleSubmit(onSubmit),
//     isDirty,
//     hasLoginError: isError,
//     formErrors: errors,
//     isLoading,
//   };
// }
////////////////
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
