'use client';
import { useRef } from 'react';
import Image from 'next/image';
import defaultAvatar from '../../../../public/images/defaultAvatar.png';
import { ProfileButtons } from '@/widgets/profile-card/profile-buttons/ProfileButtons';
import { ProfileStats } from '@/entities/profile/ui/ProfileStats';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Button } from '@/shared/ui/button/Button';
import { useAvatarUpload } from '@/features/profile/hooks/useAvatarUpload';

type Props = {
  isOwner: boolean;
  isAuthorized: boolean;
  //for the future
  //profileInfo: UserProfile
};

export const ProfileCard = ({ isOwner, isAuthorized }: Props): ReactElement => {
  // Для разработки - захардкоженные данные профиля
  const profile = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    aboutMe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatarUrl: null,
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadAvatar, isLoading } = useAvatarUpload();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log('Uploading file:', file);
      await uploadAvatar(file);
      console.log(
        'Upload successful - profile will be refetched automatically'
      );
    } catch (error) {
      // Handle error (you might want to show a toast or alert)
      console.error('Failed to upload avatar:', error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const displayName = profile
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() ||
      profile.username
    : 'URLProfile';

  return (
    <div className={'flex gap-9'}>
      <div className="flex flex-col items-center gap-4">
        <div className="h-[204px] w-[204px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={profile?.avatarUrl || defaultAvatar}
            alt="avatar"
            width={204}
            height={204}
            className={'h-full w-full object-cover'}
            priority
            unoptimized
          />
        </div>
        {isOwner && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="outlined"
              className="w-[196px] whitespace-nowrap"
              onClick={handleUploadClick}
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Add a Profile Photo'}
            </Button>
          </>
        )}
      </div>
      <div className={'flex w-full flex-col gap-5'}>
        <div className={'flex justify-between'}>
          <h2 className={'h1-text'}>{displayName}</h2>
          {isOwner && <ProfileButtons isOwner={isOwner} />}
        </div>

        <ProfileStats following={2218} followers={2218} publications={2218} />
        <div>
          <p>
            {profile?.aboutMe || (
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco{' '}
                <Link href={'#'} className={'regular-link'}>
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
