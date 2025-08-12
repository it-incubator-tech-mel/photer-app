import { useForm } from 'react-hook-form';
import {
  PaymentFormData,
  PaymentProvider,
  PaymentSubscribtionQuery,
} from '../lib/profile.types';
import { useRef, useState } from 'react';
import { useCreatePaymentSubscriptionMutation } from '../api/profileApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const useAccountManagement = () => {
  const [paymentStatus, setPaymentStatus] = useState<
    'success' | 'error' | null
  >(null);

  const { handleSubmit, watch, control } = useForm<PaymentFormData>({
    defaultValues: { accountType: 'Personal', subscriptionPeriod: 'DAILY' },
  });
  const router = useRouter();

  const isBusiness = watch('accountType') === 'Business';

  const paymentProvider = useRef<PaymentProvider | null>(null);
  const [isOpenNotify, setIsOpenNotify] = useState(false);

  const handleProviderButton = (type: PaymentProvider) => {
    paymentProvider.current = type;
    setIsOpenNotify(true);
  };
  // const [createGenInfo, { isLoading, isError }] =
  //   useCreateProfileGenInfoMutation();
  const [createPayment, { isLoading, isError }] =
    useCreatePaymentSubscriptionMutation();

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const requestBody: PaymentSubscribtionQuery = {
        subscriptionPeriod: data.subscriptionPeriod,
        paymentProvider: paymentProvider.current,
        baseUrl: `https://photer.ltd/profile/6?tab=Account%20Management`,
      };

      const response = await createPayment(requestBody).unwrap();
      setIsOpenNotify(false);

      router.push(`${response.url}`);

      // Здесь можно обработать успешный ответ, например, показать уведомление
      toast.success('Payment was successful!');
    } catch (error) {
      // Проверяем, есть ли ошибка и какой у нее статус
      if (error.status === 401) {
        // Обработка ошибки 401 (Unauthorized)
        toast.error('Unauthorized access. Please log in again.');
        // Здесь можно перенаправить пользователя на страницу входа или выполнить другие действия
      } else if (error.status === 409) {
        // Обработка ошибки 409 (Conflict)
        toast.error(
          'There was a conflict with your request. Please try again.'
        );
        // Здесь можно показать более подробную информацию о конфликте
      } else {
        // Обработка других ошибок
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };
  const handleCloseNotify = () => {
    setIsOpenNotify(false);
  };
  return {
    handleSubmit,
    onSubmit,
    control,
    isBusiness,
    isLoading,
    isError,
    handleProviderButton,
    isOpenNotify,
    handleCloseNotify,
    paymentStatus,
    setPaymentStatus,
  };
};
