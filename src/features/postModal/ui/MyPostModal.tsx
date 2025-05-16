'use client';
import React, { ReactNode, useState } from 'react';
import { Spinner } from '@/shared/ui';
import { EditPost } from './editPost/EditPost';
import ViewPost from './viewPost/ViewPost';
import { EllipsisMenu } from './viewPost/EllipsisMenu';
import { PostModalWrapper } from './PostWrapper';
import { useGetPostQuery } from '@/shared/api/postsApi';

type Props = {
  postId: number;
  onCloseAction: () => void;
};

export const MyPostModal = ({ onCloseAction, postId }: Props): ReactNode => {
  const [isEdit, setIsEdit] = useState(false);
  const { data: post, isLoading } = useGetPostQuery(postId);

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
  }
};
