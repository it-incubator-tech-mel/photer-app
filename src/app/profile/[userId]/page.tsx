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
