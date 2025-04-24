'use client';
import { ReactElement } from 'react';
import Link from 'next/link';

export const ProfileDescription = (): ReactElement => {
  return (
    <>
      <div className={'flex gap-25'}>
        <span className={'regular-text-14'}>
          <strong>2 218</strong>
          <br /> Following
        </span>
        <span className={'regular-text-14'}>
          <strong>2 218</strong>
          <br /> Followers
        </span>
        <span className={'regular-text-14'}>
          <strong>2 218</strong>
          <br /> Publications
        </span>
      </div>
      {/*description*/}
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco{' '}
          <Link href={'#'} className={'regular-link'}>
            laboris nisi ut aliquip ex ea commodo consequat.
          </Link>
        </p>
      </div>
    </>
  );
};
