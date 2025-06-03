'use client';
import { useState } from 'react';
import { PostModal } from './PostModal';
import { PostType } from '@/features/posts/lib/post.types';
import { useRouter } from 'next/navigation';

type Props = {
  post: PostType;
  profileId?: string;
};

export const WrapPostModalSSR = ({ post, profileId }: Props) => {
  const router = useRouter();
  const handleClose = () => {
    router.push(`/profile/${profileId}`);
  };

  return (
    <PostModal onCloseAction={handleClose} post={post} profileId={profileId} />
  );
};
