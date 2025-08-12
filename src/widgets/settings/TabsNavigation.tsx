// // src/widgets/settings/TabsNavigation.tsx
// 'use client';

// import { useRouter } from 'next/navigation';

// const tabs = [
//   { key: 'info', label: 'General information' },
//   { key: 'devices', label: 'Devices' },
//   { key: 'subscriptions', label: 'Account Management' },
//   { key: 'payments', label: 'My payments' },
// ];

// type Props = {
//   currentTab: string;
// };

// export function TabsNavigation({ currentTab }: Props) {
//   const router = useRouter();

//   return (
//     <div className="border-light-900 flex border-b">
//       {tabs.map((tab) => (
//         <button
//           key={tab.key}
//           onClick={() => router.push(`/settings?part=${tab.key}`)}
//           className={`px-4 py-2 text-sm transition-colors ${
//             currentTab === tab.key
//               ? 'border-b-2 border-blue-500 text-white'
//               : 'text-light-900 hover:text-white'
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// }

///////////////////////////////////////////
// src/widgets/settings/TabsNavigation.tsx
'use client';

import { useRouter } from 'next/navigation';

const tabs = [
  { key: 'info', label: 'General information' },
  { key: 'devices', label: 'Devices' },
  { key: 'subscriptions', label: 'Account Management' },
  { key: 'payments', label: 'My payments' },
];

type Props = {
  currentTab: string;
};

export function TabsNavigation({ currentTab }: Props) {
  const router = useRouter();

  return (
    <div className="border-light-900 grid w-full grid-cols-4 border-b text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => router.push(`/settings?part=${tab.key}`)}
          className={`px-4 py-3 text-center transition-colors ${
            currentTab === tab.key
              ? //   ? 'border-b-2 border-blue-500 text-white'
                'border-b-2 border-blue-500 font-medium text-blue-500'
              : 'text-light-900 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
