import { Modal } from '@/widgets/modal/Modal';
import { Button } from '../../button/Button';

type Props = {
  open: boolean;
  close: () => void;
  onAccept: () => void;
  onDecline: () => void;
};
export const ConfirmClose = ({ open, close, onAccept, onDecline }: Props) => {
  return (
    <Modal open={open} onClose={close} title="Close Post">
      <div>
        <p className="mt-[7px] mb-[30px]">
          Do you really want to close the edition of the publication? If you
          close changes won’t be saved
        </p>
        <div className="flex justify-end gap-[24px]">
          <Button variant="outlined" className="w-[96px]" onClick={onAccept}>
            Yes
          </Button>
          <Button className="w-[96px]" onClick={onDecline}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};
