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

export type MyPaymentsRequest = {
  pageNumber: number;
  pageSize: number;
  sortDirection: 'asc' | 'desc';
  sortBy: 'dateOfPayment' | 'endDateOfSubscription';
};

export type SubscriptionItem = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: string;
  paymentType: string;
};

export type MyPaymentsResponse = {
  items: SubscriptionItem[];
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
};
