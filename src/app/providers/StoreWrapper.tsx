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

  // Список маршрутов, где нужно показывать Sidebar
  const sidebarRoutes = ['/', '/profile', '/search'];
  const showSidebar = sidebarRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <Provider store={store}>
      <div className="flex min-h-screen w-full flex-col">
        <Header withLoginBtn={true} />

        <div className="flex flex-1 overflow-hidden">
          {showSidebar && (
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setSidebarOpen((prev) => !prev)}
            />
          )}

          <main
            className={cn(
              'flex-1 transition-all duration-300',
              showSidebar && (isSidebarOpen ? 'ml-60' : 'ml-[64px]')
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
