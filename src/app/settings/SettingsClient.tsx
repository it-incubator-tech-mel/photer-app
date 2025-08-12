// src/app/settings/SettingsClient.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { TabsNavigation } from '@/widgets/settings/TabsNavigation';
import { MyPayments } from './MyPayments';

type Props = {
  accessToken: string;
  userId: number;
};

export function SettingsClient({ accessToken, userId }: Props) {
  console.log('[SettingsClient] ✅ accessToken:', accessToken);
  console.log('[SettingsClient] ✅ userId:', userId);

  const searchParams = useSearchParams();
  const part = searchParams.get('part') || 'info';

  console.log(
    '🔑 accessToken в page.tsx перед передачей в MyPayments:',
    accessToken
  );

  return (
    <div className="text-light-100 mx-auto max-w-[1050px] px-4 py-6">
      <TabsNavigation currentTab={part} />
      <div className="mt-6">
        {part === 'payments' && <MyPayments />}
        {part === 'devices' && <p>Devices (coming soon)</p>}
        {part === 'subscriptions' && <p>Subscriptions (coming soon)</p>}
        {part === 'info' && <p>General Info (coming soon)</p>}
        {part === 'security' && <p>Security (coming soon)</p>}
      </div>
    </div>
  );
}
