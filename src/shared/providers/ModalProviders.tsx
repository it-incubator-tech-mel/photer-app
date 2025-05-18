'use client';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/shared/state/store';
import { AuthModal } from '@/features/auth/modal/AuthModal';

import { closeModal } from '@/shared/state/slices/modalSlice';
import { Modal } from '@/widgets/modal/Modal';

export function ModalProvider(): React.ReactElement | null {
  const { isOpen, type, props } = useSelector(
    (state: RootState) => state.modal
  );
  const dispatch = useAppDispatch();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Modal open={isOpen} onClose={() => dispatch(closeModal())}>
        {type === 'auth' && <AuthModal {...props} />}
      </Modal>
    </>
  );
}
