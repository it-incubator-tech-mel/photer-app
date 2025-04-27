// /widgets/MainSection/registered-users/RegisteredUsers.tsx

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
      className="bg-dark-700 text-light-100 flex flex-col items-center justify-center rounded-2xl border border-gray-300 px-6 py-8 max-md:px-4 max-md:py-6"
      style={{ width: '972px', margin: '0 auto' }} // равные отступы слева и справа с автоцентрированием
    >
      <span className="text-[28px] leading-none font-bold tracking-tight max-md:text-[22px]">
        {count.toLocaleString('en-US')}
      </span>
      <span className="text-md text-light-900 mt-2 max-md:text-sm">
        Registered users:
      </span>
    </div>
  );
};
