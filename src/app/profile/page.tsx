// src/app/profile/page.tsx

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function MyProfileRedirectPage() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    console.log('🔴 No refreshToken');
    return redirect('/sign-in?redirect=/profile');
  }

  console.log('🔄 Trying to refresh accessToken...');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  if (!res.ok) {
    console.log('🔴 Refresh-token request failed');
    return redirect('/sign-in?redirect=/profile');
  }

  const { accessToken } = await res.json();
  console.log('🟢 accessToken:', accessToken);

  const meResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    }
  );
  console.log('🟡 /auth/me status:', meResponse.status);

  if (!meResponse.ok) {
    console.log('🔴 /auth/me request failed');
    return redirect('/sign-in?redirect=/profile');
  }

  const meData = await meResponse.json();
  const userId = meData.userId;

  if (!userId) {
    console.log('🔴 No userId in /auth/me response');
    return redirect('/sign-in?redirect=/profile');
  }

  return redirect(`/profile/${userId}`);
}
