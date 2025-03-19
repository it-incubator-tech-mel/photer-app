'use client';

import { useState } from 'react';
import { useRegisterMutation } from '../../api/authApi';
import type { SignUpFormData } from './validationSchema';
import { UseRegistrationReturn } from '../types/useSignUpFormReturn';
import { useDispatch } from 'react-redux';
import { openModal } from '@/shared/state/slices/modalSlice';

export function useRegistration(): UseRegistrationReturn {
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [userData, setUserData] = useState<SignUpFormData | null>(null);
  const dispatch = useDispatch();

  const registerNewUser = async (data: SignUpFormData): Promise<boolean> => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    setUserData(data);
    try {
      // await registerUser(payload).unwrap();
      dispatch(
        openModal({
          modalProps: {
            title: 'Email sent',
            description: `We have sent a link to confirm your email to ${data.email}`,
          },
        })
      );
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };

  return {
    registerNewUser,
    isLoading,
    error,
    isSuccess,
    setIsSuccess,
    userData,
  };
}
