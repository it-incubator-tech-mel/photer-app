// widgets/MainSection/ui/MainSection.tsx

'use client';

import { ReactElement } from 'react';
import { RegisteredUsers } from '@/widgets/MainSection/registered-users/RegisteredUsers';
import { MainFeed } from '../MainFeed/ui/MainFeed';
import { Post } from '@/entities/post/model/types';

export const MainSection = ({
  initialPosts,
}: {
  initialPosts: Post[];
}): ReactElement => {
  return (
    <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-8">
      <div className="flex items-center justify-center">
        <RegisteredUsers count={12345} />
      </div>
      <MainFeed initialPosts={initialPosts} /> {/* передаем */}
    </section>
  );
};
// ////////////
// widgets/MainSection/ui/MainSection.tsx

// 'use client';

// import { ReactElement } from 'react';
// import { RegisteredUsers } from '@/widgets/MainSection/registered-users/RegisteredUsers';
// import { MainFeed } from '../MainFeed/ui/MainFeed';
// import { Post } from '@/entities/post/model/types';

// export const MainSection = ({
//   initialPosts,
// }: {
//   initialPosts: Post[];
// }): ReactElement => {
//   return (
//     <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-8">
//       <div className="flex items-center justify-center">
//         <RegisteredUsers />
//       </div>
//       <MainFeed initialPosts={initialPosts} />
//     </section>
//   );
// };
////////////////
