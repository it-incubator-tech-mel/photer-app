'use client';
import Link from 'next/link';
import { IconSprite } from '../icon/IconSprite';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const clientId = {
  github: 'Ov23lir8x9I7B8X9reDt',
  google:
    '1099297385916-a16ljifvg90k44o95br2upvucoi5qej4.apps.googleusercontent.com',
};
const serviceApi = {
  github: `https://github.com/login/oauth/authorize?client_id=${clientId.github}`,
  google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId.google}&redirect_uri=http://localhost:3000/login&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`,
};

type Props = {
  oauthService: 'github' | 'google';
};

export const OAuth = ({ oauthService }: Props) => {
  const searchParams = useSearchParams(); // Получаем параметры запроса
  useEffect(() => {
    const code = searchParams.get('code'); // Получаем значение параметра code
    console.log('Параметры из URL:', code); // Выводим параметры в консоль
  }, [searchParams]);

  return (
    <Link href={serviceApi[oauthService]}>
      <IconSprite iconName={oauthService} width="36" height="36" />
    </Link>
  );
};
