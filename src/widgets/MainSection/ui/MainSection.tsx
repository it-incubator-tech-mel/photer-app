// widgets/MainSection/ui/MainSection.tsx

'use client';

import { ReactElement } from 'react';
import { MainFeed } from '../MainFeed/ui/MainFeed';
import { RegisteredUsers } from '../registered-users/RegisteredUsers';

export const MainSection = (): ReactElement => {
  return (
    <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-6">
        <RegisteredUsers count={12345} />
      </div>

      <MainFeed initialPosts={[]} />
    </section>
  );
};
////////////////////
