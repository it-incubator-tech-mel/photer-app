// src/app/settings/security/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SecuritySettingsPageClient from './_client-page';

export default async function SecuritySettingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    redirect('/sign-in?redirect=/settings/security');
  }

  return <SecuritySettingsPageClient />;
}
