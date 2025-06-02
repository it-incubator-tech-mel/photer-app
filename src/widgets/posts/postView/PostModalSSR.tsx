// src/features/postModal/ui/MyPostModalFromServer.tsx
'use client';

import { ReactNode } from 'react';
import { PostType } from '@/features/posts/lib/post.types';
import { ViewPost } from '@/features/posts';
import { useRouter } from 'next/navigation';
import { PostModalWrapper } from '@/features/posts/ui/postView/PostWrapper';

type Props = {
  post: PostType;
  profileId: string;
};

export const PostModalSSR = ({ post, profileId }: Props): ReactNode => {
  const router = useRouter();
  return (
    <PostModalWrapper
      onCloseAction={() => router.push(`/profile/${profileId}`)}
    >
      <ViewPost isAuthorized={false} post={post} />
    </PostModalWrapper>
  );
};
