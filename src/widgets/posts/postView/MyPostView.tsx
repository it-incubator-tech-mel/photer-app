'use client';
import React, { ReactNode, useState } from 'react';
import { Spinner } from '@/shared/ui';
import { PostModalWrapper } from './PostWrapper';
import { useGetPostQuery } from '@/features/posts/api/postsApi';
import { ViewPost } from '@/features/posts';
import { EllipsisMenu } from '@/features/posts/ui/postView/EllipsisMenu';
import { EditPost } from '@/features/posts/ui/postEdit/EditPost';

type Props = {
  postId: number;
  onCloseAction: () => void;
};

export const MyPostView = ({ onCloseAction, postId }: Props): ReactNode => {
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
