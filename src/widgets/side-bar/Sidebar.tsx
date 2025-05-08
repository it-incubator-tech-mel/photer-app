// // // src/widgets/side-bar/Sidebar.tsx
// // 1 ВАРИАНТ
// 'use client';

// import React from 'react';
// import { IoIosMenu } from 'react-icons/io';
// import { FiLogOut } from 'react-icons/fi';

// import HoverDiv from './HoverDiv';
// import { ytSidebarDataset } from './SidebarData';
// import SidebarItem from './SidebarItem';
// import { cn } from '@/shared/lib/cn';

// type SidebarProps = {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// };

// export default function Sidebar({
//   isSidebarOpen,
//   toggleSidebar,
// }: SidebarProps): React.JSX.Element {
//   return (
//     <div
//       className={cn(
//         'sticky top-[60px] flex h-[calc(100vh-60px)] flex-col overflow-hidden border-r-2 border-zinc-700 bg-black text-slate-50 transition-all duration-300',
//         {
//           'w-[229px]': isSidebarOpen,
//           'w-[64px]': !isSidebarOpen,
//         }
//       )}
//     >
//       {/* Верхняя панель: бургер-меню */}
//       <section
//         className={cn('flex items-center overflow-x-hidden py-4', {
//           'justify-center': !isSidebarOpen,
//           'gap-4 px-5': isSidebarOpen,
//         })}
//       >
//         <HoverDiv
//           className="flex items-center gap-2 rounded-full p-2"
//           onClick={toggleSidebar}
//         >
//           <IoIosMenu className="text-3xl" />
//           {isSidebarOpen && <FiLogOut className="rotate-180 text-xl" />}
//         </HoverDiv>
//       </section>

//       {/* Центральная часть: пункты меню */}
//       <div className="flex-1 overflow-x-hidden overflow-y-auto">
//         {ytSidebarDataset
//           .filter((d) => d.title !== 'Log Out')
//           .map((d, i) => (
//             <React.Fragment key={i}>
//               {d.title && (
//                 <section
//                   className={cn('w-full', {
//                     'px-4': isSidebarOpen,
//                   })}
//                 >
//                   <SidebarItem
//                     path={d.path}
//                     activeIcon={d.activeIcon}
//                     defaultIcon={d.defaultIcon}
//                     title={d.title}
//                     isSidebarOpen={isSidebarOpen}
//                   />
//                 </section>
//               )}

//               {d.title === 'Search' && <div className="h-6" />}
//               {d.title === 'Favorites' && <div className="h-10" />}

//               {d.nestedItems && isSidebarOpen && d.nestedItems.length > 0 && (
//                 <section className="mt-4 w-full border-t border-zinc-600 px-4 pt-4">
//                   <p className="mb-2 px-3">{d.sectionTitle}</p>
//                   {d.nestedItems.map((n, ni) => (
//                     <SidebarItem
//                       key={ni}
//                       path={n.path}
//                       activeIcon={n.activeIcon}
//                       defaultIcon={n.defaultIcon}
//                       title={n.title}
//                       isSidebarOpen={isSidebarOpen}
//                     />
//                   ))}
//                 </section>
//               )}
//             </React.Fragment>
//           ))}
//       </div>

//       {/* Нижняя часть: Log Out */}
//       <div
//         className={cn(
//           { 'px-4': isSidebarOpen, 'px-2': !isSidebarOpen },
//           'pb-6'
//         )}
//       >
//         <SidebarItem
//           title="Log Out"
//           path="/logout"
//           defaultIcon={<FiLogOut />}
//           activeIcon={<FiLogOut />}
//           isSidebarOpen={isSidebarOpen}
//         />
//       </div>
//     </div>
//   );
// }

// // src/widgets/side-bar/Sidebar.tsx
// // 2 ВАРИАНТ
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { IoIosMenu } from 'react-icons/io';
// import { FiLogOut } from 'react-icons/fi';
// import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

// import HoverDiv from './HoverDiv';
// import { ytSidebarDataset } from './SidebarData';
// import SidebarItem from './SidebarItem';
// import { cn } from '@/shared/lib/cn';

// type SidebarProps = {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// };

// export default function Sidebar({
//   isSidebarOpen,
//   toggleSidebar,
// }: SidebarProps): React.JSX.Element {
//   // refs for outer container and inner list
//   const containerRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<HTMLDivElement>(null);

//   // how much we've shifted the list up
//   const [offset, setOffset] = useState(0);
//   // maximum offset so we don't overscroll
//   const [maxOffset, setMaxOffset] = useState(0);

//   // compute maxOffset when items or open state change
//   useEffect(() => {
//     const containerH = containerRef.current?.clientHeight ?? 0;
//     const listH = listRef.current?.scrollHeight ?? 0;
//     setMaxOffset(Math.max(0, listH - containerH));
//     // reset offset if sidebar closes or list shrinks
//     if (!isSidebarOpen) setOffset(0);
//     else setOffset((prev) => Math.min(prev, Math.max(0, listH - containerH)));
//   }, [isSidebarOpen, ytSidebarDataset.length]);

//   // amount to scroll per click: one container's height
//   const scrollStep = containerRef.current?.clientHeight ?? 0;

//   const onUp = () => setOffset((prev) => Math.max(0, prev - scrollStep));
//   const onDown = () =>
//     setOffset((prev) => Math.min(maxOffset, prev + scrollStep));

//   return (
//     <div
//       className={cn(
//         'sticky top-[60px] flex flex-col' +
//           ' border-r-2 border-zinc-700 bg-black text-slate-50' +
//           ' transition-all duration-300',
//         {
//           'w-[229px]': isSidebarOpen,
//           'w-[64px]': !isSidebarOpen,
//         }
//       )}
//       style={{
//         height: 'calc(100vh - 60px)',
//       }}
//     >
//       {/* Верхняя панель */}
//       <section
//         className={cn('flex items-center gap-4 py-4', {
//           'justify-center': !isSidebarOpen,
//           'px-5': isSidebarOpen,
//         })}
//       >
//         <HoverDiv
//           className="flex items-center gap-2 rounded-full p-2"
//           onClick={toggleSidebar}
//         >
//           <IoIosMenu className="text-3xl" />
//           {isSidebarOpen && <FiLogOut className="rotate-180 text-xl" />}
//         </HoverDiv>
//       </section>

//       {/* Контейнер без native scroll */}
//       <div className="relative flex-1 overflow-hidden" ref={containerRef}>
//         {/* Up button, only if we can scroll up */}
//         {offset > 0 && (
//           <button
//             onClick={onUp}
//             className="absolute top-0 left-1 z-10 rounded-full bg-black/50 p-1"
//           >
//             <IoIosArrowUp className="text-light-100 text-xl" />
//           </button>
//         )}

//         {/* Сдвигаем список через translateY */}
//         <div
//           ref={listRef}
//           style={{
//             transform: `translateY(-${offset}px)`,
//             transition: 'transform 0.2s ease',
//           }}
//         >
//           {ytSidebarDataset
//             .filter((d) => d.title !== 'Log Out')
//             .map((d, i) => (
//               <React.Fragment key={i}>
//                 {d.title && (
//                   <section className="w-full px-4">
//                     <SidebarItem
//                       path={d.path}
//                       activeIcon={d.activeIcon}
//                       defaultIcon={d.defaultIcon}
//                       title={d.title}
//                       isSidebarOpen={isSidebarOpen}
//                     />
//                   </section>
//                 )}
//                 {d.title === 'Search' && <div className="h-6" />}
//                 {d.title === 'Favorites' && <div className="h-10" />}

//                 {d.nestedItems && isSidebarOpen && d.nestedItems.length > 0 && (
//                   <section className="mt-4 w-full border-t border-zinc-600 px-4 pt-4">
//                     <p className="mb-2 px-3">{d.sectionTitle}</p>
//                     {d.nestedItems.map((n, ni) => (
//                       <SidebarItem
//                         key={ni}
//                         path={n.path}
//                         activeIcon={n.activeIcon}
//                         defaultIcon={n.defaultIcon}
//                         title={n.title}
//                         isSidebarOpen={isSidebarOpen}
//                       />
//                     ))}
//                   </section>
//                 )}
//               </React.Fragment>
//             ))}
//         </div>

//         {/* Down button, only if more content below */}
//         {offset < maxOffset && (
//           <button
//             onClick={onDown}
//             className="absolute bottom-0 left-1 z-10 rounded-full bg-black/50 p-1"
//           >
//             <IoIosArrowDown className="text-light-100 text-xl" />
//           </button>
//         )}
//       </div>

//       {/* Нижняя часть: Log Out */}
//       <div className="px-4 pb-6">
//         <SidebarItem
//           title="Log Out"
//           path="/logout"
//           defaultIcon={<FiLogOut />}
//           activeIcon={<FiLogOut />}
//           isSidebarOpen={isSidebarOpen}
//         />
//       </div>
//     </div>
//   );
// }

// // src/widgets/side-bar/Sidebar.tsx
// 3 ВАРИАНТ
// 'use client';

// import React from 'react';
// import { IoIosMenu } from 'react-icons/io';
// import { FiLogOut } from 'react-icons/fi';

// import HoverDiv from './HoverDiv';
// import { ytSidebarDataset } from './SidebarData';
// import SidebarItem from './SidebarItem';
// import { cn } from '@/shared/lib/cn';

// type SidebarProps = {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// };

// export default function Sidebar({
//   isSidebarOpen,
//   toggleSidebar,
// }: SidebarProps): React.JSX.Element {
//   return (
//     <div
//       className={cn(
//         'sticky top-[60px] flex h-[calc(100vh-60px)] flex-col overflow-hidden border-r-2 border-zinc-700 bg-black text-slate-50 transition-all duration-300',
//         {
//           'w-[229px]': isSidebarOpen,
//           'w-[64px]': !isSidebarOpen,
//         }
//       )}
//     >
//       {/* Верхняя панель: бургер-меню */}
//       <section
//         className={cn('flex items-center overflow-x-hidden py-4', {
//           'justify-center': !isSidebarOpen,
//           'gap-4 px-5': isSidebarOpen,
//         })}
//       >
//         <HoverDiv
//           className="flex items-center gap-2 rounded-full p-2"
//           onClick={toggleSidebar}
//         >
//           <IoIosMenu className="text-3xl" />
//           {isSidebarOpen && <FiLogOut className="rotate-180 text-xl" />}
//         </HoverDiv>
//       </section>

//       {/* Центральная часть: пункты меню */}
//       <div className="flex-1 overflow-x-hidden overflow-y-auto">
//         {ytSidebarDataset
//           .filter((d) => d.title !== 'Log Out')
//           .map((d, i) => (
//             <React.Fragment key={i}>
//               {d.title && (
//                 <section
//                   className={cn('w-full', {
//                     'px-4': isSidebarOpen,
//                   })}
//                 >
//                   <SidebarItem
//                     path={d.path}
//                     activeIcon={d.activeIcon}
//                     defaultIcon={d.defaultIcon}
//                     title={d.title}
//                     isSidebarOpen={isSidebarOpen}
//                   />
//                 </section>
//               )}
//               {d.title === 'Search' && <div className="h-6" />}
//               {d.title === 'Favorites' && <div className="h-10" />}

//               {d.nestedItems && isSidebarOpen && d.nestedItems.length > 0 && (
//                 <section className="mt-4 w-full border-t border-zinc-600 px-4 pt-4">
//                   <p className="mb-2 px-3">{d.sectionTitle}</p>
//                   {d.nestedItems.map((n, ni) => (
//                     <SidebarItem
//                       key={ni}
//                       path={n.path}
//                       activeIcon={n.activeIcon}
//                       defaultIcon={n.defaultIcon}
//                       title={n.title}
//                       isSidebarOpen={isSidebarOpen}
//                     />
//                   ))}
//                 </section>
//               )}
//             </React.Fragment>
//           ))}
//       </div>

//       {/* Нижняя часть: Log Out */}
//       <div
//         className={cn(
//           { 'px-4': isSidebarOpen, 'px-2': !isSidebarOpen },
//           'pb-6'
//         )}
//       >
//         <SidebarItem
//           title="Log Out"
//           path="/logout"
//           defaultIcon={<FiLogOut />}
//           activeIcon={<FiLogOut />}
//           isSidebarOpen={isSidebarOpen}
//         />
//       </div>
//     </div>
//   );
// }

// // src/widgets/side-bar/Sidebar.tsx
// 4 ВАРИАНТ

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
        'sticky top-[60px] flex h-[calc(100vh-60px)] flex-col overflow-hidden border-r-2 border-zinc-700 bg-black text-slate-50 transition-all duration-300',
        {
          'w-[229px]': isSidebarOpen,
          'w-[64px]': !isSidebarOpen,
        }
      )}
    >
      {/* Верхняя панель: бургер-меню */}
      <section
        className={cn('flex items-center overflow-hidden py-4', {
          'justify-center': !isSidebarOpen,
          'gap-4 px-5': isSidebarOpen,
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

      {/* Центральная часть: пункты меню */}
      <div className="flex-1 overflow-hidden">
        {ytSidebarDataset
          .filter((d) => d.title !== 'Log Out')
          .map((d, i) => (
            <React.Fragment key={i}>
              {d.title && (
                <section
                  className={cn('w-full truncate', {
                    'px-4': isSidebarOpen,
                  })}
                >
                  <SidebarItem
                    path={d.path}
                    activeIcon={d.activeIcon}
                    defaultIcon={d.defaultIcon}
                    title={d.title}
                    isSidebarOpen={isSidebarOpen}
                  />
                </section>
              )}

              {d.title === 'Search' && <div className="h-6" />}
              {d.title === 'Favorites' && <div className="h-10" />}

              {d.nestedItems && isSidebarOpen && d.nestedItems.length > 0 && (
                <section className="mt-4 w-full border-t border-zinc-600 px-4 pt-4">
                  <p className="mb-2 truncate px-3">{d.sectionTitle}</p>
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

      {/* Нижняя часть: Log Out */}
      <div
        className={cn(
          { 'px-4': isSidebarOpen, 'px-2': !isSidebarOpen },
          'pb-6'
        )}
      >
        <SidebarItem
          title="Log Out"
          path="/logout"
          defaultIcon={<FiLogOut />}
          activeIcon={<FiLogOut />}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
}
