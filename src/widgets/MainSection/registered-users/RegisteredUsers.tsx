// widgets/MainSection/registered-users/RegisteredUsers.tsx

'use client';

import { ReactElement } from 'react';

type RegisteredUsersProps = {
  count: number;
};

export const RegisteredUsers = ({
  count,
}: RegisteredUsersProps): ReactElement => {
  return (
    <div
      className="border-dark-300 bg-dark-700 flex h-[72px] w-[972px] items-center justify-between rounded-[2px] border px-6 py-3"
      style={{ margin: '0 auto' }}
    >
      {/* Текст "Registered users:" */}
      <h2 className="text-light-100 text-[18px] leading-6 font-bold">
        Registered users:
      </h2>

      {/* Блок с количеством */}
      <div className="border-dark-300 bg-dark-700 flex h-[48px] w-[203px] items-center justify-center gap-1 rounded-[2px] border">
        {count
          .toString()
          .padStart(5, '0') // чтобы всегда было ровно 5 цифр
          .split('')
          .map((digit, index) => (
            <button
              key={index}
              className="text-light-100 flex h-[24px] w-[24px] items-center justify-center rounded-[2px] text-[18px] leading-6 font-bold"
            >
              {digit}
            </button>
          ))}
      </div>
    </div>
  );
};
/////////
// widgets/MainSection/registered-users/RegisteredUsers.tsx

// 'use client';

// import { ReactElement } from 'react';
// import { useGetTotalUsersCountQuery } from '@/shared/api/usersApi';

// export const RegisteredUsers = (): ReactElement => {
//   const { data, isLoading } = useGetTotalUsersCountQuery();

//   const count = data?.totalCount ?? 0; // если ещё грузится — показываем 0

//   return (
//     <div
//       className="border-dark-300 bg-dark-700 flex h-[72px] w-[972px] items-center justify-between rounded-[2px] border px-6 py-3"
//       style={{ margin: '0 auto' }}
//     >
//       <h2 className="text-light-100 text-[18px] leading-6 font-bold">
//         Registered users:
//       </h2>

//       <div className="border-dark-300 bg-dark-700 flex h-[48px] w-[203px] items-center justify-center gap-1 rounded-[2px] border">
//         {count
//           .toString()
//           .padStart(5, '0')
//           .split('')
//           .map((digit, index) => (
//             <button
//               key={index}
//               className="text-light-100 flex h-[24px] w-[24px] items-center justify-center rounded-[2px] text-[18px] leading-6 font-bold"
//             >
//               {digit}
//             </button>
//           ))}
//       </div>
//     </div>
//   );
// };
/////////////
