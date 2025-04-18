'use client';

import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { Alert } from '@/shared/ui/alert/Alert';
import { Header } from '@/widgets/header/Header';
import { store } from '@/shared/state/store';
// import { ModalProvider } from './ModalProviders';
import Sidebar from '@/widgets/side-bar/Sidebar';

export default function StoreWrapper({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <Provider store={store}>
      <div className="flex h-screen w-full flex-col overflow-auto">
        <div className="shrink-0">
          <Header withLoginBtn={true} />
        </div>

        <div className="flex w-full grow">
          {/* Sidebar теперь слева */}
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Основной контент, который не двигается */}
          <div className="flex-grow p-4">
            <div className="w-full">{children}</div>
          </div>
        </div>

        {/* <ModalProvider /> */}
        <Alert />
      </div>
    </Provider>
  );
}
