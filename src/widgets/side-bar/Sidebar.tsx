// src/widgets/side-bar/Sidebar.tsx
'use client';

import React from 'react';
import { IoIosMenu } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';

import HoverDiv from './HoverDiv';
import { ytSidebarDataset } from './SidebarData';
import SidebarItem from './SidebarItem';
import { cn } from '@/shared/lib/cn';

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'sticky top-[60px] z-10 flex flex-col ' +
          'h-[calc(100vh-60px)] border-r-2 border-zinc-700' +
          'bg-black text-slate-50 transition-all duration-300',
        {
          'w-[219px]': isSidebarOpen,
          'w-[74px]': !isSidebarOpen,
        }
      )}
    >
      {/* Верхняя панель: бургер-меню */}
      <section
        className={cn('flex items-center gap-4 py-4', {
          'justify-center': !isSidebarOpen,
          'px-5': isSidebarOpen,
        })}
      >
        <HoverDiv
          className="flex items-center gap-2 rounded-full p-2"
          onClick={toggleSidebar}
        >
          <IoIosMenu className="text-3xl" />
          {isSidebarOpen && <FiLogOut className="rotate-180 text-xl" />}
        </HoverDiv>
      </section>

      {/* Пункты меню + Log Out */}
      {/* <div className="flex-1 overflow-y-auto"> */}
      <div className="flex-1">
        {ytSidebarDataset
          // показываем все пункты, включая «Log Out»
          .map((d, i) => (
            <React.Fragment key={i}>
              {/* секция с заголовком пункта, если он есть */}
              {d.title && (
                <section className="w-full px-4">
                  <SidebarItem
                    path={d.path}
                    activeIcon={d.activeIcon}
                    defaultIcon={d.defaultIcon}
                    title={d.title}
                    isSidebarOpen={isSidebarOpen}
                  />
                </section>
              )}
              {/* отступы под специфичные пункты */}
              {/* {d.title === 'Search' && <div className="h-6" />} */}
              {/* {d.title === 'Favorites' && <div className="h-10" />} */}

              {/* вложенные пункты */}
              {d.nestedItems && isSidebarOpen && d.nestedItems.length > 0 && (
                <section className="mt-4 w-full border-t border-zinc-600 px-4 pt-4">
                  <p className="mb-2 px-3">{d.sectionTitle}</p>
                  {d.nestedItems.map((n, ni) => (
                    <SidebarItem
                      key={ni}
                      path={n.path}
                      activeIcon={n.activeIcon}
                      defaultIcon={n.defaultIcon}
                      title={n.title}
                      isSidebarOpen={isSidebarOpen}
                    />
                  ))}
                </section>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
