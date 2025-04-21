// // app/profile/[userId]/page.tsx
// 'use client';

// import { useGetMeQuery } from '@/features/auth/api/authApi';
// import { useLogout } from '@/features/auth/hooks/useLogout';
// import { LogoutModal } from '@/features/auth/ui/login-form/LogoutForm';
// import { LogoutButton } from '@/widgets/logout-button/LogoutButton';
// import { ReactElement } from 'react';

// export default function Page(): ReactElement {
//   const { isOpen, openModal, closeModal, confirmLogout } = useLogout();
//   const { data } = useGetMeQuery();

//   return (
//     <div>
//       <h1>Profile {data?.email}</h1>
//       <LogoutButton openModal={openModal} />
//       <LogoutModal
//         open={isOpen}
//         userEmail={''}
//         onConfirmed={confirmLogout}
//         onCanceled={closeModal}
//       />
//     </div>
//   );
// }

/////////////////////////////

// // app/profile/[userId]/page.tsx
// 'use client';

// import { ReactElement } from 'react';

// export default function Page(): ReactElement {
//   return (
//     <div>
//       <h1>🔧 Profile Page Stub</h1>
//       <p>This is a placeholder page for user profile.</p>
//     </div>
//   );
// }
/////////////////////////////

// app/profile/[userId]/page.tsx

import { getUserProfile } from '@/shared/api/profile';
import { notFound } from 'next/navigation';
import { UserProfile } from '@/widgets/profile/UserProfile';

export default async function UserProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const profile = await getUserProfile(params.userId);

  if (!profile) return notFound();

  return <UserProfile profile={profile} />;
}
