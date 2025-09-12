import { authApi } from '@/features/auth/api/authApi';
import { useDeletePostMutation } from '@/features/posts/api/postsApi';
import { errorHandler } from '@/features/posts/lib/errorHandler';
import { PostType } from '@/features/posts/lib/post.types';
import { RootState } from '@/shared/state/store';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  post: PostType;
  onCloseAction: () => void;
  profileId?: string;
};

type usePostModalReturn = {
  userId: string | undefined;
  isOwner: boolean;
  handleDelete: () => void;
  showDeleteConfirm: boolean;
  handleConfirmDelete: () => Promise<void>;
  handleCancelDelete: () => void;
};

export const usePostModal = ({
  post,
  onCloseAction,
}: Props): usePostModalReturn => {
  const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isOwnerPost = useRef(false);

  const userId = useSelector(
    (state: RootState) => authApi.endpoints.getMe.select()(state).data?.userId
  );

  if (userId) {
    isOwnerPost.current = post?.owner.userId == userId;
  }
  const isOwner = isOwnerPost.current;

  const handleDelete = (): void => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    try {
      await deletePost(post.id).unwrap();
      setShowDeleteConfirm(false);
      onCloseAction();
    } catch (e) {
      errorHandler(e);
    }
  };

  const handleCancelDelete = (): void => {
    setShowDeleteConfirm(false);
  };

  return {
    userId,
    isOwner,
    handleDelete,
    showDeleteConfirm,
    handleConfirmDelete,
    handleCancelDelete,
  };
};
