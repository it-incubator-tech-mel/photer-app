import Image from 'next/image';
import defaultAvatar from '../../../../public/images/defaultAvatar.png';
import { ProfileButtons } from '@/widgets/profile-card/profile-buttons/ProfileButtons';
import { ProfileStats } from '@/entities/profile/ui/ProfileStats';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { EditProfile } from '@/features/edit-profile/EditProfile';
import { PostsList } from '@/features/posts/ui/postFeed/PostsList';
import { Posts } from '@/features/posts/lib/post.types';
import { useGetCurrentUserQuery } from '@/features/edit-profile/api/profileApi';

type Props = {
  isOwner: boolean;
  isAuthorized: boolean;
  profileId?: string;
  posts?: Posts;
};

export const ProfileCard = ({
  isOwner,
  isAuthorized,
  profileId,
  posts,
}: Props): ReactElement => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { data: user } = useGetCurrentUserQuery();

  if (isEditProfile) {
    return <EditProfile onClose={() => setIsEditProfile(false)} />;
  }

  const displayName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username
    : 'URLProfile';
  return (
    <div>
      <div className={'flex gap-9'}>
        <div className="h-[204px] w-[204px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={user?.avatarUrl || defaultAvatar}
            alt="avatar"
            width={204}
            height={204}
            className={'h-full w-full object-cover'}
            priority
            unoptimized
          />
        </div>
        <div className={'flex w-full flex-col gap-5'}>
          <div className={'flex justify-between'}>
            <h2 className={'h1-text'}>{displayName}</h2>
            {isAuthorized && (
              <ProfileButtons
                callback={() => setIsEditProfile(true)}
                isOwner={isOwner}
              />
            )}
          </div>

          <ProfileStats following={2218} followers={2218} publications={2218} />
          <div>
            <p>
              {user?.aboutMe || (
                <>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco{' '}
                  <Link href={'#'} className={'regular-link'}>
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      {profileId && <PostsList ssrPosts={posts} profileId={profileId} />}
    </div>
  );
};
