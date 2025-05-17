'use client';

import React, { ReactNode, useState } from 'react';
import { Spinner } from '@/shared/ui';
import { EditPost } from './editPost/EditPost';
import ViewPost from './viewPost/ViewPost';
import { EllipsisMenu } from './viewPost/EllipsisMenu';
import { useDeletePostMutation, useGetPostQuery } from '../api/postsApi';
import { PostModalWrapper } from './PostWrapper';
import { errorHandler } from '@/features/postModal/lib/errorHandler';

type Props = {
  postId: number;
  onCloseAction: () => void;
};

export const MyPostModal = ({ onCloseAction, postId }: Props): ReactNode => {
  const [isEdit, setIsEdit] = useState(false);
  const { data: post, isLoading } = useGetPostQuery(postId);
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const handleDelete = async () => {

    console.log('delete', postId);

    try {
      await deletePost(postId).unwrap();
      onCloseAction();
    } catch (e) {
      errorHandler(e);
    }
  }

  if (isLoading)
    return (
      <PostModalWrapper onCloseAction={onCloseAction}>
        <div className="bg-dark-300 min-h-[400px] w-full">
          <Spinner />
        </div>
      </PostModalWrapper>
    );

  if (post) {
    return (
      <PostModalWrapper onCloseAction={onCloseAction}>
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
                  callback: handleDelete,
                }
              ]}
            />
          </ViewPost>
        ) : (
          <EditPost post={post} onCloseAction={() => setIsEdit(false)} />
        )}
      </PostModalWrapper>
    );
  }
};
