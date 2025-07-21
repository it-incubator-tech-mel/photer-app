// src/features/postModal/ui/MyPostModalFromServer.tsx
'use client';

import { ReactNode, useState } from 'react';
import { Spinner } from '@/shared/ui';
import { EditPost } from './editPost/EditPost';
import ViewPost from './viewPost/ViewPost';
import { EllipsisMenu } from './viewPost/EllipsisMenu';
import { PostModalWrapper } from './PostWrapper';
import { PostType } from '@/features/posts/types/post.types';

type Props = {
  post: PostType;
};

export const MyPostModalFromServer = ({ post }: Props): ReactNode => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <PostModalWrapper onCloseAction={() => history.back()}>
      {!isEdit ? (
        <ViewPost post={post}>
          <EllipsisMenu
            menuItems={[
              {
                title: 'Edit post',
                iconName: 'edit-2-outline',
                callback: (): void => {
                  setIsEdit(true);
                },
              },
              {
                title: 'Delete post',
                iconName: 'trash-outline',
                callback: (): void => {},
              },
            ]}
          />
        </ViewPost>
      ) : (
        <EditPost post={post} onCloseAction={() => setIsEdit(false)} />
      )}
    </PostModalWrapper>
  );
};
