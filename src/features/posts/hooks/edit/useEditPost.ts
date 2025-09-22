import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { PostType } from '../../lib/post.types';
import { useUpdatePostMutation, postsApi } from '../../api/postsApi';
import { errorHandler } from '../../lib/errorHandler';
import { useAppDispatch } from '@/shared/state/store';

type PropsHookEditPost = {
  onCloseAction: () => void;
  onPostUpdated?: (updatedPost: PostType) => void;
  MAX_SYMBOL_COUNT: number;
  post: PostType;
};

type HookEditPost = {
  description: string;
  openConfirmClose: boolean;
  editPostRef: RefObject<HTMLDivElement | null>;
  handleChange: (text: string) => void;
  setOpenConfirmClose: (value: boolean) => void;
  confirmChange: () => void;
  handleAccept: () => void;
  handleUpdatePost: () => Promise<void>;
  handleDecline: () => void;
  isUpdating: boolean;
  hasChanges: boolean;
};

export function useEditPost({
  onCloseAction,
  onPostUpdated,
  MAX_SYMBOL_COUNT,
  post,
}: PropsHookEditPost): HookEditPost {
  const [description, setDescription] = useState(post.description);
  const editPostRef = useRef<HTMLDivElement>(null);
  const [openConfirmClose, setOpenConfirmClose] = useState(false);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const dispatch = useAppDispatch();

  const hasChanges = description !== post.description;

  const handleChange = (text: string): void => {
    if (text.length <= MAX_SYMBOL_COUNT) {
      setDescription(text);
    }
  };

  const confirmChange = useCallback((): void => {
    if (!hasChanges) {
      onCloseAction();
    } else {
      setOpenConfirmClose(true);
    }
  }, [hasChanges, onCloseAction]);

  const handleAccept = (): void => {
    setOpenConfirmClose(false);
    onCloseAction();
  };

  const handleDecline = (): void => {
    setOpenConfirmClose(false);
  };

  const handleUpdatePost = async (): Promise<void> => {
    try {
      console.log('=== EDIT POST DEBUG ===', {
        postId: post.id,
        originalDescription: post.description,
        newDescription: description,
        hasChanges: description !== post.description,
        timestamp: new Date().toISOString(),
      });

      const result = await updatePost({ postId: post.id, description }).unwrap();

      console.log('Post updated successfully', {
        postId: post.id,
        newDescription: description,
        result,
      });

      // Call onPostUpdated callback with updated post data
      if (onPostUpdated) {
        const updatedPost: PostType = {
          ...post,
          description,
          updatedAt: new Date().toISOString(), // Assume server updates this
        };
        console.log('Calling onPostUpdated callback with updated post', {
          updatedPost,
        });
        onPostUpdated(updatedPost);
      }

      onCloseAction();
    } catch (error) {
      console.error('Failed to update post:', error);
      errorHandler(error);
      // Не закрываем модальное окно при ошибке, чтобы пользователь мог повторить попытку
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (
        editPostRef.current &&
        !editPostRef.current.contains(event.target as Node)
      ) {
        confirmChange();
      }
    },
    [confirmChange]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    editPostRef,
    description,
    handleChange,
    openConfirmClose,
    setOpenConfirmClose,
    confirmChange,
    handleAccept,
    handleUpdatePost,
    handleDecline,
    isUpdating,
    hasChanges,
  };
}
