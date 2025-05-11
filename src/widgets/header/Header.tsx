// src/widgets/header/Header.tsx
'use client';

import { ReactElement, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/state/store';
import { useGetMeQuery } from '@/features/auth/api/authApi';

type Props = {
  withLoginBtn?: boolean;
};

export const Header = ({ withLoginBtn = false }: Props): ReactElement => {
  const { data } = useGetMeQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <header className="text-light-100 border-dark-300 h-[60px] w-full border-b-1 px-15 py-3 max-md:px-[15px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <Link href={'/'} className="large-text">
          Inctagram
        </Link>
        <div className="flex gap-2">
          {withLoginBtn && !data && (
            <>
              <Button asChild variant="text" className="w-[100px]">
                <Link href="/sign-in">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
