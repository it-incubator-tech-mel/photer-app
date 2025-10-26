import { ReactNode } from 'react';
import { Modal } from '@/widgets/modal/Modal';
import { Button } from '@/shared/ui/button/Button';

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export const DeletePostModal = ({
  open,
  onConfirm,
  onCancel,
  isLoading = false,
}: Props): ReactNode => {
  return (
    <Modal open={open} onClose={onCancel} title="Delete post">
      <p className="mt-[7px] mb-[30px]">
        Are you sure you want to delete this post?
      </p>
      <div className="flex justify-end gap-[24px]">
        <Button
          variant="outlined"
          className="w-[96px]"
          onClick={onCancel}
          disabled={isLoading}
        >
          No
        </Button>
        <Button className="w-[96px]" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Yes'}
        </Button>
      </div>
    </Modal>
  );
};
