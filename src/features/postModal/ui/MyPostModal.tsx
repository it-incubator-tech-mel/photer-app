'use client';
import React, { ReactNode, useState } from 'react';
import { IconSprite } from '@/shared/ui';
import { EditPost } from './editPost/EditPost';
import ViewPost from './viewPost/ViewPost';
import { EllipsisMenu } from './viewPost/EllipsisMenu';
import { PostType } from '../lib/post.types';

type Props = {
  post: PostType;
  onCloseAction: () => void;
};
export const MyPostModal = ({ onCloseAction, post }: Props): ReactNode => {
  const [isEdit, setIsEdit] = useState(false);
  console.log('MyPostModal', post);

  return (
    <div className="fixed top-1/2 left-1/2 mx-auto flex w-full max-w-[972px] -translate-x-1/2 -translate-y-1/2">
      <button
        onClick={onCloseAction}
        className="absolute top-[-34px] right-[-38px] cursor-pointer outline-none"
      >
        <IconSprite iconName="close" />
      </button>
      {isEdit ? (
        <EditPost post={post} onCloseAction={() => setIsEdit(false)} />
      ) : (
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
      )}
    </div>
  );
};
