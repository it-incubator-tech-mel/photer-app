// 'use client';

// import { useLogoutMutation } from '@/features/auth/api/authApi';
// import { useRouter } from 'next/navigation';
// import { IconSprite } from '@/shared/ui/icon/IconSprite';
// import { SpriteName } from '@/shared/ui/icon/IconSprite';
// import { cn } from '@/shared/lib/cn';

// type Props = {
//   isSidebarOpen: boolean;
// };

// export function LogoutSidebarItem({ isSidebarOpen }: Props) {
//   const [logout] = useLogoutMutation();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap(); // вызывает POST /auth/logout
//       router.push('/'); // редирект на главную
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//   };

//   const defaultIcon: SpriteName = 'log-out-outline';
//   const activeIcon: SpriteName = 'log-out';

//   return (
//     <button
//       onClick={handleLogout}
//       className={cn(
//         'hover:bg-dark-500 flex w-full items-center overflow-hidden rounded-lg px-3 py-2 text-sm transition-all',
//         {
//           'justify-center': !isSidebarOpen,
//           'gap-4': isSidebarOpen,
//         }
//       )}
//     >
//       <IconSprite iconName={activeIcon} className="h-6 w-6 fill-white" />
//       {isSidebarOpen && (
//         <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-red-500">
//           Log Out
//         </span>
//       )}
//     </button>
//   );
// }
////////////////////////
// 'use client';

// import { useLogoutMutation } from '@/features/auth/api/authApi';
// import { useRouter } from 'next/navigation';
// import { IconSprite } from '@/shared/ui/icon/IconSprite';
// import { SpriteName } from '@/shared/ui/icon/IconSprite';
// import { cn } from '@/shared/lib/cn';
// import { useDispatch } from 'react-redux';
// import { baseApi } from '@/shared/lib/baseApi'; // путь до baseApi
// // import { logoutAction } from '@/features/auth/model/authSlice'; // если есть

// type Props = {
//   isSidebarOpen: boolean;
// };

// export function LogoutSidebarItem({ isSidebarOpen }: Props) {
//   const [logout] = useLogoutMutation();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();

//       // 🔥 Сброс кэша и состояний
//       dispatch(baseApi.util.resetApiState());
//       // dispatch(logoutAction()); // если есть

//       router.push('/');
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//   };

//   const activeIcon: SpriteName = 'log-out';

//   return (
//     <button
//       onClick={handleLogout}
//       className={cn(
//         'hover:bg-dark-500 flex w-full items-center overflow-hidden rounded-lg px-3 py-2 text-sm transition-all',
//         {
//           'justify-center': !isSidebarOpen,
//           'gap-4': isSidebarOpen,
//         }
//       )}
//     >
//       <IconSprite iconName={activeIcon} className="h-6 w-6 fill-white" />
//       {isSidebarOpen && (
//         <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-red-500">
//           Log Out
//         </span>
//       )}
//     </button>
//   );
// }
///////////////////////////////

'use client';

import { useLogoutMutation } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { IconSprite } from '@/shared/ui/icon/IconSprite';
import { SpriteName } from '@/shared/ui/icon/IconSprite';
import { cn } from '@/shared/lib/cn';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/shared/lib/baseApi';

type Props = {
  isSidebarOpen: boolean;
};

export function LogoutSidebarItem({ isSidebarOpen }: Props) {
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(baseApi.util.resetApiState());
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const activeIcon: SpriteName = 'log-out';

  return (
    <button
      onClick={handleLogout}
      className={cn(
        'flex w-full items-center overflow-hidden rounded-lg px-3 py-2 text-sm transition-all duration-200',
        'group text-red-500 hover:bg-red-600 hover:text-white',
        {
          'justify-center': !isSidebarOpen,
          'gap-4': isSidebarOpen,
        }
      )}
    >
      <IconSprite
        iconName={activeIcon}
        className="h-6 w-6 fill-current transition-all duration-200"
      />
      {isSidebarOpen && (
        <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200">
          Log Out
        </span>
      )}
    </button>
  );
}
