'use client';
import Image from 'next/image';
import defaultAvatar from '../../../../public/images/defaultAvatar.png';
import { ProfileButtons } from '@/widgets/profile-card/profile-buttons/ProfileButtons';
import { ProfileStats } from '@/entities/profile/ui/ProfileStats';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Button } from '@/shared/ui/button/Button';

type Props = {
  isOwner: boolean;
  isAuthorized: boolean;
  //for the future
  //profileInfo: UserProfile
};

export const ProfileCard = ({ isOwner, isAuthorized }: Props): ReactElement => {
  return (
    <div className={'flex gap-9'}>
      <div className="flex flex-col items-center">
        <Image
          src={defaultAvatar} // || profileInfo.avatar
          alt="avatar"
          width={204}
          height={204}
          className={'rounded-full'}
        />
        {isOwner && (
          <div className="mt-4 w-full flex justify-center">
            <Button variant="outlined" className="w-49">
              Add a Profile Photo
            </Button>
          </div>
        )}
      </div>
      <div className={'flex w-full flex-col gap-5'}>
        <div className={'flex justify-between'}>
          <h2 className={'h1-text'}>URLProfile{/*|| profileInfo.userName*/}</h2>
          {isAuthorized && <ProfileButtons isOwner={isOwner} />}
        </div>

        <ProfileStats following={2218} followers={2218} publications={2218} />
        <div>
          <p>
            {/*profileInfo.aboutMe*/}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco{' '}
            <Link href={'#'} className={'regular-link'}>
              laboris nisi ut aliquip ex ea commodo consequat.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
