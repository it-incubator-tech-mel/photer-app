import {
  ErrorIncorrectValue,
  ErrorUnauthorized,
} from '@/shared/types/commonTypes';

export type ProfileGenIfo = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  city: string;
  aboutMe: string;
  avatarUrl: string;
};

export type Country = {
  cca2: string;
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  name: {
    common: string;
    nativeName: {
      [key: string]: string;
    };
  };
  official: string;
};

export type Cca2Code = {
  cca2: string;
};

export type UploadAvatarResponse = {
  fileUrl: string;
};

export type PaymentProvider = 'STRIPE' | 'PAYPAL';

type SubscriptionPeriod = 'MONTHLY' | 'WEEKLY' | 'DAILY';

export type PaymentSubscribtionQuery = {
  subscriptionPeriod: SubscriptionPeriod;
  paymentProvider: PaymentProvider;
  baseUrl: string;
};

export type PaymentSuccessSubscribtionResponse = {
  url: string;
};
type PaymentErrorSubscribtionResponse = {
  statusCode: 409;
  message: 'Subscription already active';
  error: 'Conflict';
};
export type PaymentSubscribtionResponse =
  | PaymentSuccessSubscribtionResponse
  | PaymentErrorSubscribtionResponse
  | ErrorIncorrectValue
  | ErrorUnauthorized;

export type PaymentFormData = {
  accountType: 'Personal' | 'Business';
  subscriptionPeriod: SubscriptionPeriod;
};

export type GetPaymentsQuery = {
  pageNumber: number;
  pageSize: number;
  sortDirection: 'asc' | 'desc';
  sortBy: 'dateOfPayment' | 'EndDateOfSubscription';
};

type Subscription = {
  dateOfPayment: string;
  endDateOfSubscription: string;
  paymentType: PaymentProvider;
  price: number;
  subscriptionId: string;
  subscriptionType: SubscriptionPeriod;
  userId: string;
};

type GetSubscriptionsSuccessResponse = {
  data: {
    items: Subscription[];
    totalCount: number;
    pagesCount: number;
    page: number;
    pageSize: number;
  };
  status: string;
};

export type GetSubscriptionsResponse =
  | GetSubscriptionsSuccessResponse
  | ErrorUnauthorized;
