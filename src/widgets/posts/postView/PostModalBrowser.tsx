'use client';

import React, { ReactNode, useState } from 'react';
import { Spinner } from '@/shared/ui';
import {
  useDeletePostMutation,
  useGetPostQuery,
} from '@/features/posts/api/postsApi';
import { EditPost } from '@/features/posts/ui/postEdit/EditPost';
import { EllipsisMenu } from '@/features/posts/ui/postView/EllipsisMenu';
import { errorHandler } from '@/features/posts/lib/errorHandler';
import { ViewPost } from '@/features/posts';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/state/store';
import { authApi } from '@/features/auth/api/authApi';
import { PostModalWrapper } from '@/features/posts/ui/postView/PostWrapper';

type Props = {
  postId: number;
  onCloseAction: () => void;
};

export const PostModalBrowser = ({
  onCloseAction,
  postId,
}: Props): ReactNode => {
  const [isEdit, setIsEdit] = useState(false);
  const { data: post, isLoading } = useGetPostQuery(postId);
  const [deletePost] = useDeletePostMutation();

  const user = useSelector(
    (state: RootState) => authApi.endpoints.getMe.select()(state).data
  );
  const isOwner = post?.userId === user?.userId;

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePost(postId).unwrap();
      onCloseAction();
    } catch (e) {
      errorHandler(e);
    }
  };

  if (isLoading) {
    return (
      <PostModalWrapper onCloseAction={onCloseAction}>
        <div className="bg-dark-300 min-h-[400px] w-full">
          <Spinner />
        </div>
      </PostModalWrapper>
    );
  }

  if (post) {
    return (
      <PostModalWrapper onCloseAction={onCloseAction}>
        {!isEdit ? (
          <ViewPost isAuthorized={!!user} post={post}>
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
          <EditPost post={post} onCloseAction={() => setIsEdit(false)} />
        )}
      </PostModalWrapper>
    );
  }
};
