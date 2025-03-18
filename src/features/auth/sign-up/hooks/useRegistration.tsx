'use client';

import { useState } from 'react';
import { useRegisterMutation } from '../../api/authApi';
import type { SignUpFormData } from './validationSchema';
import { UseRegistrationReturn } from '../types/useSignUpFormReturn';

export function useRegistration(): UseRegistrationReturn {
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [userData, setUserData] = useState<SignUpFormData | null>(null);

  const registerNewUser = async (data: SignUpFormData): Promise<boolean> => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    setUserData(data);
    try {
      await registerUser(payload).unwrap();
      setIsSuccess(true);
      return true;
    } catch (error) {
      if (error) {
        return false;
      } else {
        alert('Something went wrong. Please try again.');
      }

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
