// src/app/providers/StoreWrapper.tsx
'use client';

import { ReactElement, ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { usePathname } from 'next/navigation';

import { store } from '@/shared/state/store';
import { Alert } from '@/shared/ui/alert/Alert';
import { Header } from '@/widgets/header/Header';
import Sidebar from '@/widgets/side-bar/Sidebar';
import { ModalProvider } from './ModalProviders';
import { cn } from '@/shared/lib/cn';

export default function StoreWrapper({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const sidebarRoutes = ['/', '/profile', '/create', '/messenger', '/search'];
  const showSidebar = sidebarRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <Provider store={store}>
      <div className="flex min-h-screen w-full flex-col">
        <Header withLoginBtn={true} />

        <div className="flex flex-1">
          {showSidebar && (
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setSidebarOpen((prev) => !prev)}
            />
          )}

          <main
            className={cn(
              'flex-1 overflow-auto transition-all duration-300',
              showSidebar
                ? isSidebarOpen
                  ? // при ОТКРЫТОМ сайдбаре — справа 24px, слева 4px
                    'pr-6 pl-1'
                  : // при ЗАКРЫТОМ — справа 8px, слева 12px
                    'pr-2 pl-3'
                : // если сайдбар не отображается — стандартные 24px по бокам
                  'px-6'
            )}
          >
            {children}
          </main>
        </div>

        <ModalProvider />
        <Alert />
      </div>
    </Provider>
  );
}
