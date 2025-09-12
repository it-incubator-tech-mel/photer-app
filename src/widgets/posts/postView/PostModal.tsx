'use client';

import React, { ReactNode, useState } from 'react';
import { EditPost } from '@/features/posts/ui/postEdit/EditPost';
import { EllipsisMenu } from '@/features/posts/ui/postView/EllipsisMenu';
import { ViewPost } from '@/features/posts';
import { PostModalWrapper } from '@/features/posts/ui/postView/PostWrapper';
import { PostType } from '@/features/posts/lib/post.types';
import { usePostModal } from '@/features/posts/hooks/view/usePostModal';
import { useGetPostQuery } from '@/features/posts/api/postsApi';

type Props = {
  post: PostType;
  onCloseAction: () => void;
};

export const PostModal = ({ onCloseAction, post }: Props): ReactNode => {
  const [isEdit, setIsEdit] = useState(false);

  // Получаем актуальные данные поста из кеша
  const { data: currentPost } = useGetPostQuery(Number(post.id));

  const { userId, isOwner, handleDelete } = usePostModal({
    onCloseAction,
    post: currentPost || post,
  });

  return (
    <PostModalWrapper onCloseAction={onCloseAction}>
      {!isEdit ? (
        <ViewPost isAuthorized={!!userId} post={currentPost || post}>
          {isOwner && (
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
                  callback: handleDelete,
                },
              ]}
            />
          )}
        </ViewPost>
      ) : (
        <EditPost
          post={currentPost || post}
          onCloseAction={() => setIsEdit(false)}
        />
      )}
    </PostModalWrapper>
  );
};
