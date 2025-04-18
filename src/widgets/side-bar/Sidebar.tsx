/** @format */
'use client';

import React from 'react';
import HoverDiv from './HoverDiv';
import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';

import { ytSidebarDataset } from './sidebarData';
import { cn } from './utils/cn';
import SidebarItem from './SidebarItem';

export default function Sidebar(): React.JSX.Element {
  const [isSidebarOpen, setSidebar] = useState(false);

  function toggleSidebar(): void {
    setSidebar(!isSidebarOpen);
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col border-r-2 border-zinc-700 bg-black text-slate-50 transition-all duration-300',
        {
          'w-60': isSidebarOpen,
          'w-25': !isSidebarOpen,
        }
      )}
    >
      <section className="flex items-center gap-4 px-5 py-4">
        <HoverDiv
          className={cn('rounded-full px-2 py-2', {
            'mx-2': !isSidebarOpen,
          })}
          onClick={toggleSidebar}
        >
          <IoIosMenu className="text-3xl" />
        </HoverDiv>
      </section>
      <main
        className={cn(
          'flex h-full w-full flex-col items-start overflow-y-auto transition-all duration-300'
        )}
      >
        {ytSidebarDataset.map((d, i: number) => (
          <React.Fragment key={i}>
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
            {/* nested section */}
            {d.nestedItems && isSidebarOpen && d.nestedItems?.length > 0 && (
              <section className="mt-4 w-full border-t border-zinc-600 px-4 pt-4">
                <p className="mb-2 px-3">{d.sectionTitle}</p>
                {d.nestedItems?.map((n, i) => (
                  <SidebarItem
                    path={n.path}
                    key={i}
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
      </main>
    </div>
  );
}

// home
//  <GoHome />
// <GoHomeFill />

// shorts
// YtShortsIcon
// <SiYoutubeshorts />

// Subscriptions
// Subscriptions
// SubscriptionsFill

// You
// You
// YouFill
