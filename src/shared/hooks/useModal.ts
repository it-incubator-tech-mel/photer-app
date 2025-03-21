import { useAppDispatch } from '@/shared/state/store';
import { openModal } from '@/shared/state/slices/modalSlice';

export const useModal = (): {
  showModal: (title: string, description: string) => void;
} => {
  const dispatch = useAppDispatch();

  const showModal = (title: string, description: string): void => {
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
