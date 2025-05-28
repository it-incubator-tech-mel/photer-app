// // src/app/create-post/page.tsx
// import { PostCreationWizard } from '@/features/postCreate/ui/PostCreationWizard';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// export default async function CreatePost() {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken')?.value;

//   if (!accessToken) {
//     redirect('/sign-in?redirect=/create-post');
//   }

//   return (
//     <div className="px-4 py-8">
//       <PostCreationWizard exitSubscriberAction={() => history.back()} />
//     </div>
//   );
// }
/////////////////////////

// src/app/create-post/page.tsx
import { PostCreationWizard } from '@/features/postCreate/ui/PostCreationWizard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CreatePost() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    redirect('/sign-in?redirect=/create-post');
  }

  return (
    <div className="px-4 py-8">
      <PostCreationWizard /> {/* ✅ без props */}
    </div>
  );
}
