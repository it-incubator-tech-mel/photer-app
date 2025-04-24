'use client';
import Image from 'next/image';
import defaultAvatar from '../../../../public/images/defaultAvatar.png';
import { ReactElement } from 'react';
import { ProfileDescription } from '@/features/profile/ui/ProfileDescription';
import { ProfileButtons } from '@/widgets/profile-buttons/ProfileButtons';

type Props = {
  isOwner?: boolean;
  isAuthorized?: boolean;
};

export const ProfileInfo = ({
  isOwner = false,
  isAuthorized = false,
}: Props): ReactElement => {
  return (
    <div className={'flex gap-9'}>
      <Image
        src={defaultAvatar}
        alt="avatar"
        width={204}
        height={204}
        className={'rounded-full'}
      />
      <div className={'flex w-full flex-col gap-5'}>
        <div className={'flex justify-between'}>
          <h2 className={'h1-text'}>URLProfile</h2>
          {isAuthorized && <ProfileButtons isOwner={isOwner} />}
        </div>

        <ProfileDescription />
      </div>
    </div>
  );
};
