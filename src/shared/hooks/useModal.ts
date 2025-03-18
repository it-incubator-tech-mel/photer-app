// hooks/useModal.ts
import { useAppDispatch } from '@/shared/state/store';
import { openModal } from '@/shared/state/slices/modalSlice';

export const useModal = () => {
  const dispatch = useAppDispatch();

  const showModal = (title: string, description: string) => {
    dispatch(
      openModal({
        modalProps: {
          title,
          description,
        },
      })
    );
  };

  return { showModal };
};
