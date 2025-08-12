// 'use client';

// import { FC, JSX, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { Spinner } from '@/shared/ui';
// import { useGetMeQuery } from '@/features/auth/api/authApi';

// type Role = 'all' | 'auth';

// export const withAuth = <T extends object>(
//   Component: FC<T>,
//   routeRole: Role
// ): FC<T> => {
//   const ComponentWithAuth = (props: T): JSX.Element => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { isLoading, isFetching, data: userData } = useGetMeQuery();

//     useEffect(() => {
//       if (!isLoading && !isFetching && routeRole === 'auth' && !userData) {
//         const redirectUrl = `/sign-in?redirect=${encodeURIComponent(pathname)}`;
//         console.log('🔒 Неавторизован. Редиректим на:', redirectUrl);
//         router.replace(redirectUrl);
//       } else if (userData) {
//         console.log('✅ Авторизован, доступ разрешён');
//       }
//     }, [userData, isLoading, isFetching, pathname, routeRole, router]);

//     if (isLoading || isFetching) {
//       return <Spinner />;
//     }

//     return <Component {...props} />;
//   };

//   return ComponentWithAuth;
// };

//////////////////////////////////
// 'use client';

// import { FC, JSX, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { Spinner } from '@/shared/ui';
// import { useGetMeQuery } from '@/features/auth/api/authApi';

// type Role = 'all' | 'auth';

// export const withAuth = <T extends object>(
//   Component: FC<T>,
//   routeRole: Role
// ): FC<T> => {
//   const ComponentWithAuth = (props: T): JSX.Element => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { isLoading, isFetching, data: userData, error } = useGetMeQuery();

//     useEffect(() => {
//       console.log('🧩 withAuth useEffect');
//       console.log('📦 isLoading:', isLoading);
//       console.log('📦 isFetching:', isFetching);
//       console.log('📦 userData:', userData);
//       console.log('📦 routeRole:', routeRole);

//       if (!isLoading && !isFetching) {
//         if (routeRole === 'auth' && !userData) {
//           const redirectUrl = `/sign-in?redirect=${encodeURIComponent(pathname)}`;
//           console.log('🔒 Неавторизован. Редиректим на:', redirectUrl);
//           router.replace(redirectUrl);
//         } else if (userData) {
//           console.log('✅ Авторизован. Доступ разрешён:', userData);
//         }

//         if (error) {
//           console.warn('❗️Ошибка при запросе /auth/me:', error);
//         }
//       }
//     }, [userData, isLoading, isFetching, error, pathname, routeRole, router]);

//     if (isLoading || isFetching) {
//       return <Spinner />;
//     }

//     return <Component {...props} />;
//   };

//   return ComponentWithAuth;
// };
