'use client';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@/widgets/modal/Modal';
import { Button } from '@/shared/ui';
import { closeModal } from '@/shared/state/slices/modalSlice';
import { RootState } from '@/shared/state/store';

export function ModalProvider() {
  const dispatch = useDispatch();
  const {
    isOpen,
    modalProps: { title, description },
  } = useSelector((state: RootState) => state.modal);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      title={title}
      size={'sm'}
      onClose={() => dispatch(closeModal())}
    >
      <div className="flex flex-col gap-2">
        <p>{description}</p>
        <Button
          onClick={() => dispatch(closeModal())}
          className="right-0 w-[96px]"
        >
          OK
        </Button>
      </div>
    </Modal>
  );
}
