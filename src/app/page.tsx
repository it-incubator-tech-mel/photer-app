// 'use client';

// import { Button } from '@/shared/ui';
// import Link from 'next/link';
// import { ReactElement } from 'react';

// export default function Home(): ReactElement {
//   return (
//     <div>
//       <main>
//         Вы не вошли в систему или ваша сессия истекла, авторизуйтесь пожалуйста
//         <Button asChild variant={'text'}>
//           <Link href="/sign-in">Войти</Link>
//         </Button>
//       </main>
//     </div>
//   );
// }

//////////////////////////////////////

// 'use client';

// import { Button } from '@/shared/ui';
// import Link from 'next/link';
// import { ReactElement } from 'react';
// import { MainFeed } from '@/features/main-feed/ui/MainFeed';

// export default function Home(): ReactElement {
//   return (
//     <div className="p-4 text-white">
//       <main className="space-y-6">
//         <section className="rounded-lg bg-zinc-800 p-4 shadow">
//           <p className="mb-2">
//             Вы не вошли в систему или ваша сессия истекла, авторизуйтесь,
//             пожалуйста:
//           </p>
//           <Button asChild variant={'text'}>
//             <Link href="/sign-in">Войти</Link>
//           </Button>
//         </section>

//         <section>
//           <h2 className="mb-4 text-2xl font-semibold">🔥 Последние посты</h2>
//           <MainFeed />
//         </section>
//       </main>
//     </div>
//   );
// }

///////////////////////////////////

'use client';

import { Button } from '@/shared/ui';
import Link from 'next/link';
import { ReactElement } from 'react';
import { MainFeed } from '@/features/main-feed/ui/MainFeed';
import { useGetUserCountQuery } from '@/features/main/api/mainApi'; // используем API с моками

export default function Home(): ReactElement {
  const { data: userCountData, isLoading, isError } = useGetUserCountQuery();

  return (
    <div className="p-4 text-white">
      <main className="space-y-6">
        <section className="rounded-lg bg-zinc-800 p-4 shadow">
          <p className="mb-2">
            Вы не вошли в систему или ваша сессия истекла, авторизуйтесь,
            пожалуйста:
          </p>
          <Button asChild variant={'text'}>
            <Link href="/sign-in">Войти</Link>
          </Button>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">🔥 Последние посты</h2>

          {isLoading && <p>Загрузка количества пользователей...</p>}
          {isError && <p>Не удалось загрузить количество пользователей</p>}
          {userCountData && (
            <p className="mb-4 text-sm text-gray-400">
              Количество пользователей: {userCountData.count}
            </p>
          )}

          <MainFeed />
        </section>
      </main>
    </div>
  );
}
