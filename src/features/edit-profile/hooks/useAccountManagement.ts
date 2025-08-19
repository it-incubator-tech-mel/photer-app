import { useForm } from 'react-hook-form';
import {
  PaymentFormData,
  PaymentProvider,
  PaymentSubscribtionQuery,
  PaymentSubscribtionResponse,
  PaymentSuccessSubscribtionResponse,
} from '../lib/profile.types';
import { useRef, useState } from 'react';
import {
  useCreatePaymentSubscriptionMutation,
  useGetMySubscriptionsQuery,
} from '../api/profileApi';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import { convertDateToString, convertStringToDate } from '../lib/genInfoLib';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/state/store';
import { authApi } from '@/features/auth/api/authApi';

type UseAccountManagementReturn = {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: ReturnType<typeof useForm<PaymentFormData>>['control'];
  isBusiness: boolean;
  handleProviderButton: (type: PaymentProvider) => void;
  isOpenNotify: boolean;
  handleCloseNotify: () => void;
  paymentStatus: 'success' | 'error' | null;
  setPaymentStatus: (value: 'success' | 'error' | null) => void;
  mySubscription: {
    isActive: boolean;
    expiredDate: string;
    paymentDate: string;
  };
};

export const useAccountManagement = (): UseAccountManagementReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const paymentProvider = useRef<PaymentProvider | null>(null);
  const [isOpenNotify, setIsOpenNotify] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    'success' | 'error' | null
  >(null);
  const userId = useSelector(
    (state: RootState) => authApi.endpoints.getMe.select()(state).data?.userId
  );

  // API
  const [createPayment] = useCreatePaymentSubscriptionMutation();
  const { data: activeSubscription } = useGetMySubscriptionsQuery({
    pageNumber: 1,
    pageSize: 10,
    sortDirection: 'asc',
    sortBy: 'dateOfPayment',
  });

  // Form
  const { handleSubmit, watch, control } = useForm<PaymentFormData>({
    defaultValues: { accountType: 'Personal', subscriptionPeriod: 'DAILY' },
  });
  const isBusiness = watch('accountType') === 'Business';
  const onSubmit = async (data: PaymentFormData): Promise<void> => {
    try {
      const requestBody: PaymentSubscribtionQuery = {
        subscriptionPeriod: data.subscriptionPeriod,
        paymentProvider: paymentProvider.current!,
        baseUrl: `${process.env.NEXT_PUBLIC_ROOT_URL}/profile/${userId}?tab=Account%20Management`,
      };
      const response = await createPayment(requestBody).unwrap();
      setIsOpenNotify(false);
      const redirectURL = (response as PaymentSuccessSubscribtionResponse).url;
      router.push(`${redirectURL}`);
    } catch (e) {
      const error = e as { status: number; data: PaymentSubscribtionResponse };
      let errorMessage = '';
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized access. Please log in again.';
          break;
        case 409:
          errorMessage = 'The subscription is already active.';
          break;
        default:
          errorMessage =
            'An unexpected error occurred. Please try again later.';
      }
      toast.error(errorMessage);
    }
  };
  const handleProviderButton = (type: PaymentProvider): void => {
    paymentProvider.current = type;
    setIsOpenNotify(true);
  };

  // Получаем статус оплаты подписки из url
  const hasSuccess = pathname.includes('success');
  const hasFailed = pathname.includes('failed');
  if (hasSuccess) {
    setPaymentStatus('success');
  } else if (hasFailed) {
    setPaymentStatus('error');
  }

  const handleCloseNotify = (): void => {
    setIsOpenNotify(false);
    router.replace(`/profile/${userId}?tab=Account%20Management`);
  };

  // Активная подписка
  const mySubscription = {
    isActive: false,
    expiredDate: '',
    paymentDate: '',
  };

  if (
    activeSubscription &&
    'data' in activeSubscription &&
    activeSubscription.data.items.length
  ) {
    mySubscription.isActive = true;
    mySubscription.expiredDate = convertDateToString(
      convertStringToDate(activeSubscription.data.items[0].dateOfPayment)
    );
    mySubscription.paymentDate = convertDateToString(
      convertStringToDate(
        activeSubscription.data.items[0].endDateOfSubscription
      )
    );
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    isBusiness,
    handleProviderButton,
    isOpenNotify,
    handleCloseNotify,
    paymentStatus,
    setPaymentStatus,
    mySubscription,
  };
};
