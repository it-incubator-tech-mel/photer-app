// // src/app/page.tsx

// import { ReactElement } from 'react';
// import { MainSection } from '@/widgets/MainSection/ui/MainSection';

// export default function HomePage(): ReactElement {
//   return (
//     <>
//       <MainSection />
//     </>
//   );
// }
////////////////////
// src/app/page.tsx

import { getPosts } from '@/shared/api/getPosts';
import { MainSection } from '@/widgets/MainSection/ui/MainSection';
import { ReactElement } from 'react';

export default async function HomePage(): Promise<ReactElement> {
  // Получаем посты через серверный запрос с ISR (revalidate: 60 сек)
  const posts = await getPosts();

  return <MainSection initialPosts={posts} />;
}
////////////////////
