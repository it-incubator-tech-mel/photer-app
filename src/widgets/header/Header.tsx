// 'use client';

// import { ReactElement, useState } from 'react';

// import ruFlag from 'public/icons/ru-flag.png';
// import ukFlag from 'public/icons/uk-flag.png';
// import Link from 'next/link';

// import { SelectItem } from '../SelectBox/SelectItem';
// import { Button } from '@/shared/ui/button/Button';
// import { SelectBox } from '../SelectBox/SelectBox';

// type Props = {
//   withLoginBtn?: boolean;
// };

// export const Header = ({ withLoginBtn = false }: Props): ReactElement => {
//   const [language, setLanguage] = useState<string>('en');

//   return (
//     <header className="text-light-100 border-dark-300 h-[60px] w-full border-b-1 px-15 py-3 max-md:px-[15px]">
//       <div className="mx-auto flex max-w-[1280px] items-center justify-between">
//         <Link href={'/'} className="large-text">
//           Inctagram
//         </Link>
//         <div className="flex gap-2">
//           <SelectBox
//             value={language}
//             onValueChange={setLanguage}
//             className="bg-dark-900 border-dark-100 w-[163px] max-md:w-[70px] max-md:border-hidden"
//           >
//             <SelectItem value="en" icon={ukFlag}>
//               <span className="max-md:hidden">English</span>
//             </SelectItem>
//             <SelectItem value="ru" icon={ruFlag}>
//               <span className="max-md:hidden">Русский</span>
//             </SelectItem>
//           </SelectBox>
//           {withLoginBtn && (
//             <>
//               <Button asChild variant="text" className="w-[100px]">
//                 <Link href="/sign-in">Log In</Link>
//               </Button>
//               <Button asChild>
//                 <Link href="/sign-up">Sign Up</Link>
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

////////////////////////////////

'use client';

import { ReactElement, useState } from 'react';
import ruFlag from 'public/icons/ru-flag.png';
import ukFlag from 'public/icons/uk-flag.png';
import Link from 'next/link';

import { SelectItem } from '../SelectBox/SelectItem';
import { Button } from '@/shared/ui/button/Button';
import { SelectBox } from '../SelectBox/SelectBox';
import { useGetMeQuery } from '@/features/auth/api/authApi';

export const Header = (): ReactElement => {
  const [language, setLanguage] = useState<string>('en');

  const { data: user, isLoading } = useGetMeQuery();

  return (
    <header className="text-light-100 border-dark-300 h-[60px] w-full border-b-1 px-15 py-3 max-md:px-[15px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <Link href={'/'} className="large-text">
          Inctagram
        </Link>
        <div className="flex gap-2">
          <SelectBox
            value={language}
            onValueChange={setLanguage}
            className="bg-dark-900 border-dark-100 w-[163px] max-md:w-[70px] max-md:border-hidden"
          >
            <SelectItem value="en" icon={ukFlag}>
              <span className="max-md:hidden">English</span>
            </SelectItem>
            <SelectItem value="ru" icon={ruFlag}>
              <span className="max-md:hidden">Русский</span>
            </SelectItem>
          </SelectBox>
          {/* Теперь кнопки всегда отображаются-Кнопки Log In и Sign Up будут видны на странице, вне зависимости от состояния пользователя. Это решение подходит, если ты хочешь показывать их всем пользователям, даже тем, кто уже авторизован. */}
          <Button asChild variant="text" className="w-[100px]">
            <Link href="/sign-in">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

////////////////////////////////

// 'use client';

// import { ReactElement, useState } from 'react';
// import ruFlag from 'public/icons/ru-flag.png';
// import ukFlag from 'public/icons/uk-flag.png';
// import Link from 'next/link';

// import { SelectItem } from '../SelectBox/SelectItem';
// import { Button } from '@/shared/ui/button/Button';
// import { SelectBox } from '../SelectBox/SelectBox';
// import { useGetMeQuery } from '@/features/auth/api/authApi';

// export const Header = (): ReactElement => {
//   const [language, setLanguage] = useState<string>('en');

//   const { data: user, isLoading } = useGetMeQuery();

//   return (
//     <header className="text-light-100 border-dark-300 h-[60px] w-full border-b-1 px-15 py-3 max-md:px-[15px]">
//       <div className="mx-auto flex max-w-[1280px] items-center justify-between">
//         <Link href={'/'} className="large-text">
//           Inctagram
//         </Link>
//         <div className="flex gap-2">
//           <SelectBox
//             value={language}
//             onValueChange={setLanguage}
//             className="bg-dark-900 border-dark-100 w-[163px] max-md:w-[70px] max-md:border-hidden"
//           >
//             <SelectItem value="en" icon={ukFlag}>
//               <span className="max-md:hidden">English</span>
//             </SelectItem>
//             <SelectItem value="ru" icon={ruFlag}>
//               <span className="max-md:hidden">Русский</span>
//             </SelectItem>
//           </SelectBox>
//           {/* кнопки будут скрываться только для авторизованных пользователей и в процессе загрузки данных. */}
//           {!isLoading && !user && (
//             <>
//               <Button asChild variant="text" className="w-[100px]">
//                 <Link href="/sign-in">Log In</Link>
//               </Button>
//               <Button asChild>
//                 <Link href="/sign-up">Sign Up</Link>
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };
