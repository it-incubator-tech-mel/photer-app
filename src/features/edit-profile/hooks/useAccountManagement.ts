import { useForm } from 'react-hook-form';
import {
  PaymentFormData,
  PaymentProvider,
  PaymentSubscribtionQuery,
  PaymentSubscribtionResponse,
  PaymentSuccessSubscribtionResponse,
} from '../lib/profile.types';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useCreatePaymentSubscriptionMutation,
  useGetMySubscriptionsQuery,
  useCancelAutoRenewalMutation,
  useEnableAutoRenewalMutation,
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
  lastCreatedAutoRenewal: boolean;
  debugToggleAutoRenewal: (nextChecked: boolean) => Promise<void>;
  currentAutoRenewal: boolean;
  isTogglingAutoRenewal: boolean;
  toggleAutoRenewal: (nextChecked: boolean) => Promise<void>;
  mySubscription: {
    isActive: boolean;
    subscriptions: { expiredDate: string; paymentDate: string }[];
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
  const [refreshKey, setRefreshKey] = useState(0);
  const userId = useSelector(
    (state: RootState) => authApi.endpoints.getMe.select()(state).data?.userId
  );

  // API
  const [createPayment] = useCreatePaymentSubscriptionMutation();
  const { data: activeSubscription, refetch: refetchSubscriptions } =
    useGetMySubscriptionsQuery({
      pageNumber: 1,
      pageSize: 50,
      sortDirection: 'asc',
      sortBy: 'validUntil',
    });
  const [cancelAutoRenewal, { isLoading: isCanceling }] =
    useCancelAutoRenewalMutation();
  const [enableAutoRenewal, { isLoading: isEnabling }] =
    useEnableAutoRenewalMutation();
  const isTogglingAutoRenewal = isCanceling || isEnabling;

  // Дополнительный запрос: последняя созданная подписка (по createdAt desc, 1 запись)
  const { data: lastCreatedSubscription } = useGetMySubscriptionsQuery({
    pageNumber: 1,
    pageSize: 1,
    sortDirection: 'desc',
    sortBy: 'createdAt',
  });

  // Debug: логируем статус автопродления из GET /subscriptions
  useEffect(() => {
    if (
      activeSubscription &&
      'items' in activeSubscription &&
      Array.isArray(activeSubscription.items)
    ) {
      const activeLatest = activeSubscription.items
        .filter((s) => s.status === 'ACTIVE')
        .sort(
          (a, b) =>
            new Date(b.validUntil).getTime() - new Date(a.validUntil).getTime()
        )[0];
      console.log('[GET /subscriptions] items:', activeSubscription.items);
      console.log(
        '[GET /subscriptions] ACTIVE autoRenewal:',
        activeLatest?.autoRenewal ?? null
      );
    }
  }, [activeSubscription]);

  // Логируем autoRenewal последней созданной подписки
  useEffect(() => {
    if (
      lastCreatedSubscription &&
      'items' in lastCreatedSubscription &&
      Array.isArray(lastCreatedSubscription.items)
    ) {
      const latest = lastCreatedSubscription.items[0];
      console.log(
        '[GET /subscriptions createdAt desc size=1] autoRenewal:',
        latest?.autoRenewal ?? null
      );
    }
  }, [lastCreatedSubscription]);

  // DEBUG: последовательность GET -> POST (enable/cancel) -> GET с логами
  const debugToggleAutoRenewal = async (
    nextChecked: boolean
  ): Promise<void> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    if (!baseUrl || !token) {
      console.warn('[DEBUG] Missing baseUrl or token');
      return;
    }

    const headers: HeadersInit = {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const getSubs = async () => {
      const url = `${baseUrl}/subscriptions?pageNumber=1&pageSize=50&sortDirection=desc&sortBy=createdAt`;
      const res = await fetch(url, {
        method: 'GET',
        headers,
        credentials: 'include',
      });
      const data = await res.json();
      return data as {
        items?: Array<{
          id: number | string;
          status: string;
          autoRenewal: boolean;
          validUntil: string;
          createdAt: string;
          updatedAt: string;
          externalId?: string;
        }>;
      };
    };

    const postToggle = async () => {
      const endpoint = nextChecked
        ? '/subscriptions/enable-auto-renewal'
        : '/subscriptions/cancel-auto-renewal';
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: '',
      });
      return res;
    };

    // BEFORE
    const before = await getSubs();
    console.log('[DEBUG BEFORE] items:', before.items);

    // ACTION
    const actionRes = await postToggle();
    console.log('[DEBUG ACTION] status:', actionRes.status);
    if (!actionRes.ok && actionRes.status !== 204) {
      try {
        const err = await actionRes.json();
        console.log('[DEBUG ACTION] error body:', err);
      } catch {}
    }

    // AFTER
    const after = await getSubs();
    console.log('[DEBUG AFTER] items:', after.items);

    // DIFF
    const mapBefore = new Map<string | number, boolean>();
    before.items?.forEach((i) => mapBefore.set(i.id, i.autoRenewal));
    const changed = after.items?.filter(
      (i) => mapBefore.has(i.id) && mapBefore.get(i.id) !== i.autoRenewal
    );
    console.log('[DEBUG DIFF] changed:', changed);

    // Текущая "целевая" запись, которую считает UI (последняя по createdAt)
    const current = after.items
      ?.slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
    console.log(
      '[DEBUG CURRENT createdAt max] autoRenewal:',
      current?.autoRenewal
    );
  };

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

  // Активные подписки
  const mySubscription = {
    isActive: false,
    subscriptions: [
      {
        expiredDate: '',
        paymentDate: '',
      },
    ],
  };

  // Статус автопродления у последней созданной подписки
  const lastCreatedAutoRenewal =
    (lastCreatedSubscription &&
      'items' in lastCreatedSubscription &&
      lastCreatedSubscription.items?.[0]?.autoRenewal) ||
    false;

  // Статус автопродления у "текущей" активной подписки по минимальному validUntil
  const currentAutoRenewal = useMemo(() => {
    let result = false;
    if (
      activeSubscription &&
      'items' in activeSubscription &&
      Array.isArray(activeSubscription.items) &&
      activeSubscription.items.length
    ) {
      // Берем ту ACTIVE STRIPE, у которой максимальный updatedAt (последняя измененная бэкендом)
      const activeStripeOnly = activeSubscription.items
        .filter((s) => s.status === 'ACTIVE' && s.paymentProvider === 'STRIPE')
        .slice()
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      console.log('[ALL ACTIVE STRIPE SORTED]', activeStripeOnly);
      const minValid = activeStripeOnly[0];
      if (minValid) {
        result = minValid.autoRenewal;
        console.log('[CURRENT SUBSCRIPTION]', {
          id: minValid.id,
          validUntil: minValid.validUntil,
          autoRenewal: minValid.autoRenewal,
        });
      }
    }
    return result;
  }, [activeSubscription, refreshKey]);

  if (
    activeSubscription &&
    'items' in activeSubscription &&
    activeSubscription.items.length
  ) {
    mySubscription.isActive = true;
    activeSubscription.items.forEach((item) => {
      const subscription = {
        expiredDate: convertDateToString(convertStringToDate(item.createdAt)),
        paymentDate: convertDateToString(convertStringToDate(item.validUntil)),
      };
      mySubscription.subscriptions.push(subscription);
    });
  }

  const toggleAutoRenewal = async (nextChecked: boolean): Promise<void> => {
    try {
      if (isTogglingAutoRenewal) return;
      let result;
      if (nextChecked) {
        result = await enableAutoRenewal();
      } else {
        result = await cancelAutoRenewal();
      }
      if ('error' in result && result.error) {
        const error = result.error as { status?: number };
        if (error.status === 401) {
          toast.error('Unauthorized. Please sign in again.');
        } else if (error.status === 404) {
          toast.error('Active subscription not found.');
        } else if (error.status === 409) {
          toast.error(
            nextChecked
              ? 'Auto-renewal is already enabled.'
              : 'Auto-renewal is already disabled.'
          );
        } else {
          toast.error('Failed to update auto-renewal. Try again.');
        }
        return;
      }
      if (nextChecked) {
        toast.success('Auto-renewal enabled');
      } else {
        toast.success('Auto-renewal disabled');
      }
      // Принудительно обновляем данные и ререндерим
      await refetchSubscriptions();
      setRefreshKey((k) => k + 1);
    } catch (e) {
      console.error('[ERROR] toggleAutoRenewal', e);
      toast.error('Failed to update auto-renewal. Try again.');
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    isBusiness,
    handleProviderButton,
    isOpenNotify,
    handleCloseNotify,
    paymentStatus,
    setPaymentStatus,
    lastCreatedAutoRenewal,
    debugToggleAutoRenewal,
    currentAutoRenewal,
    isTogglingAutoRenewal,
    toggleAutoRenewal,
    mySubscription,
  };
};
