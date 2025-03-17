import timeImage from 'public/images/time.png';
import Image from 'next/image';
import { ReactElement } from 'react';
import { Button } from '@/components/button/Button';

export default function ResendLink(): ReactElement {
  return (
    <>
      <div className={'max-w-74 text-center'}>
        <h1 className={'h1-text'}>Email verification link expired</h1>
        <p className={'regular-text-16 mb mt-5 mb-7'}>
          Looks like the verification link has expired. Not to worry, we can
          send the link again
        </p>
        <Button className={'w-full'}>Resend link</Button>
      </div>
      <Image src={timeImage} alt={'time'} width={470} />
    </>
  );
}
