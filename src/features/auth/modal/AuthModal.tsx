'use client';
import { Modal } from '@/widgets/modal/Modal';
import { Button } from '@/shared/ui';
import { closeModal } from '@/shared/state/slices/modalSlice';
import { RootState, useAppDispatch } from '@/shared/state/store';
import { useSelector } from 'react-redux';

export function AuthModal(): React.ReactElement | null {
  const dispatch = useAppDispatch();

  const { isOpen, type, props } = useSelector(
    (state: RootState) => state.modal
  );
  if (!isOpen || type !== 'auth') {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      title={'Email sent'}
      size={'sm'}
      onClose={() => dispatch(closeModal())}
    >
      <div className="flex flex-col gap-2">
        <p>{`We have sent a link to confirm your email to ${props.email || ''}`}</p>
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
