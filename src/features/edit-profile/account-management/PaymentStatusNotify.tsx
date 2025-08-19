import { Button } from '@/shared/ui';
import { Modal } from '@/widgets/modal/Modal';
import { ReactNode } from 'react';

type Props = {
  onClose: () => void;
  status: 'success' | 'error' | null;
};

export const PaymentStatusNotify = ({ status, onClose }: Props): ReactNode => {
  if (!status) {
    return null;
  }

  const notifyData = {
    success: {
      title: 'Success',
      message: 'Payment was successful!',
      textInButton: 'Ok',
    },
    error: {
      title: 'Error',
      message: 'Transaction failed. Please, write to support',
      textInButton: 'Back to payment',
    },
  };
  const { title, message, textInButton } = notifyData[status];

  return (
    <div>
      <Modal open={true} size="sm" onClose={onClose} title={title} modal={true}>
        <div className="flex flex-col gap-[54px]">
          {message}
          <Button onClick={onClose}>{textInButton}</Button>
        </div>
      </Modal>
    </div>
  );
};
