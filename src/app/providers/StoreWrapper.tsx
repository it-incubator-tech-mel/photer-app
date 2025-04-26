// src/app/StoreWrapper.tsx
'use client';

import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { usePathname } from 'next/navigation';

import { store } from '@/shared/state/store';
import { Alert } from '@/shared/ui/alert/Alert';
import { Header } from '@/widgets/header/Header';
import Sidebar from '@/widgets/side-bar/Sidebar';

export default function StoreWrapper({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const pathname = usePathname();
  // если на гл.странице нужен Sidebar
  // const showSidebar = ['/', '/profile', '/settings'].some((path) =>
  const showSidebar = ['/profile', '/settings'].some((path) =>
    pathname.startsWith(path)
  );

  return (
    <Provider store={store}>
      <div className="flex h-screen w-full flex-col overflow-auto">
        <div className="shrink-0">
          <Header />
        </div>

        <div className="flex w-full grow">
          {showSidebar && (
            <div className="w-64 flex-shrink-0">
              <Sidebar />
            </div>
          )}

          <div className="flex-grow p-4">
            <div className="w-full">{children}</div>
          </div>
        </div>

        <Alert />
      </div>
    </Provider>
  );
}
// ///////////////////////////////////////////
