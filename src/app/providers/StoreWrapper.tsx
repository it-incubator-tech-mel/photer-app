// src/app/providers/StoreWrapper.tsx
'use client';

import { ReactElement, ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { usePathname } from 'next/navigation';

import { store } from '@/shared/state/store';
import { Alert } from '@/shared/ui/alert/Alert';
import { Header } from '@/widgets/header/Header';
import { ModalProvider } from './ModalProviders';
import { cn } from '@/shared/lib/cn';
import { Sidebar } from '@/widgets/side-bar/Sidebar';

export function StoreWrapper({
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
              showSidebar ? (isSidebarOpen ? 'px-6' : 'px-3') : 'px-6'
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
