'use client';

import React, { ReactNode, useState, useEffect } from 'react';
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
  const [refreshKey, setRefreshKey] = useState(0); // Force re-render when needed

  // Fetch the latest post data from cache to reflect any updates
  // Use post.id as string (CUID format)
  const { data: latestPost, refetch } = useGetPostQuery(post.id, {
    // Force refetch when cache is invalidated
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Force refetch when component mounts or post changes
  useEffect(() => {
    console.log('=== FORCING REFETCH ON MOUNT ===', { postId: post.id });
    refetch();
  }, [post.id, refetch]);

  // Always use the latest post data from RTK Query, fallback to prop only if no query data
  const currentPost = latestPost || post;

  // Debug logging for PostModal
  console.log('=== POST MODAL DEBUG ===', {
    postId: post.id,
    hasLatestPost: !!latestPost,
    propDescription: post.description,
    latestDescription: latestPost?.description,
    currentDescription: currentPost?.description,
    timestamp: new Date().toISOString(),
  });

  // Function to handle post update from EditPost component
  const handlePostUpdated = (updatedPost: PostType) => {
    console.log('=== HANDLE POST UPDATED DEBUG ===', {
      postId: updatedPost.id,
      newDescription: updatedPost.description,
      timestamp: new Date().toISOString(),
    });

    // Update the local post data immediately
    // This will cause re-render with new data
    setRefreshKey((prev) => prev + 1);
  };

  // Function to handle closing edit mode and refresh data
  const handleCloseEdit = () => {
    console.log('=== HANDLE CLOSE EDIT DEBUG ===', {
      postId: post.id,
      currentDescription: currentPost?.description,
      timestamp: new Date().toISOString(),
    });
    setIsEdit(false);
    // Force refetch to get latest data after editing
    console.log('Forcing refetch after edit for post:', post.id);
    refetch();
    // Force re-render to ensure UI updates
    setRefreshKey((prev) => prev + 1);
  };

  const { userId, isOwner, handleDelete } = usePostModal({
    onCloseAction,
    post: currentPost,
  });

  return (
    <PostModalWrapper key={refreshKey} onCloseAction={onCloseAction}>
      {!isEdit ? (
        <ViewPost isAuthorized={!!userId} post={currentPost} isOwner={isOwner}>
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
          post={currentPost}
          onCloseAction={handleCloseEdit}
          onPostUpdated={handlePostUpdated}
        />
      )}
    </PostModalWrapper>
  );
};
