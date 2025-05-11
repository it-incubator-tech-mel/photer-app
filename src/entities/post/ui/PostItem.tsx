'use client';
import { ReactElement } from 'react';
import Image from 'next/image';

type Props = {
  firstPhotoUrl: string;
};

export const PostItem = ({ firstPhotoUrl }: Props): ReactElement => {
  const openPost = (): void => {
    //view or edit post
  };

  return (
    <div className={'relative h-57 w-58'} onClick={openPost}>
      <Image
        src={firstPhotoUrl}
        alt={'post image'}
        unoptimized
        fill
        className="object-cover"
      />
    </div>
  );
};
