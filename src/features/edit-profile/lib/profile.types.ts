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

export type PaymentFormData = {
  accountType: 'Personal' | 'Business';
  subscriptionPeriod: SubscriptionPeriod;
};
