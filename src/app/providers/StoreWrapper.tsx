'use client';

import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { Alert } from '@/shared/ui/alert/Alert';
import { Header } from '@/widgets/header/Header';
import { store } from '@/shared/state/store';

export default function StoreWrapper({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <Provider store={store}>
      <div className="flex h-screen w-full flex-col">
        <Header withLoginBtn={true} />
        <div className="flex w-full flex-col items-center justify-center">
          {children}
        </div>
        <Alert />
      </div>
    </Provider>
  );
}
