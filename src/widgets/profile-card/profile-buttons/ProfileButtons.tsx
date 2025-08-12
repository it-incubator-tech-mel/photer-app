// // src/widgets/profile-card/profile-buttons/ProfileButtons.tsx
// 'use client';

// import { ReactElement } from 'react';

// type Props = {
//   isOwner: boolean;
// };

// export const ProfileButtons = ({ isOwner }: Props): ReactElement | null => {
//   if (!isOwner) return null;

//   return (
//     <div className="flex items-center">
//       <button className="h-[36px] w-[167px] cursor-pointer rounded-sm bg-[#333333] px-6 py-[6px] text-sm text-white transition-colors duration-200 hover:bg-[#4d4d4d]">
//         Profile Settings
//       </button>
//     </div>
//   );
// };

///////////////////////////////////////
// src/widgets/profile-card/profile-buttons/ProfileButtons.tsx
'use client';

import { ReactElement } from 'react';
import Link from 'next/link';

type Props = {
  isOwner: boolean;
};

export const ProfileButtons = ({ isOwner }: Props): ReactElement | null => {
  if (!isOwner) return null;

  return (
    <div className="flex items-center">
      <Link href="/settings?part=security">
        <button className="h-[36px] w-[167px] cursor-pointer rounded-sm bg-[#333333] px-6 py-[6px] text-sm text-white transition-colors duration-200 hover:bg-[#4d4d4d]">
          Profile Settings
        </button>
      </Link>
    </div>
  );
};
