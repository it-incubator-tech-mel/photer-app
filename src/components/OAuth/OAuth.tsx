'use client';
import Link from 'next/link';
import { IconSprite } from '../icon/IconSprite';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const clientId = {
  github: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};
const serviceApi = {
  github: `https://github.com/login/oauth/authorize?client_id=${clientId.github}`,
  google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId.google}&redirect_uri=http://localhost:3000/login&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`,
};

type Props = {
  service: 'github' | 'google';
};

export const OAuth = ({ service }: Props) => {
  const searchParams = useSearchParams(); // Получаем параметры запроса
  useEffect(() => {
    const code = searchParams.get('code'); // Получаем значение параметра code
    console.log('Параметры из URL:', code); // Выводим параметры в консоль
  }, [searchParams]);

  return (
    <Link href={serviceApi[service]}>
      <IconSprite iconName={service} width="36" height="36" />
    </Link>
  );
};
