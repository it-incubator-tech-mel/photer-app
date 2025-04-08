import { Modal } from '@/widgets/modal/Modal';
import { Button } from '../../button/Button';

type Props = { open: boolean };
export const ConfirmClose = ({ open }: Props) => {
  return (
    <Modal open={open} title="Close Post">
      <div>
        <p className="mt-[7px] mb-[30px]">
          Do you really want to close the edition of the publication? If you
          close changes won’t be saved
        </p>
        <div className="flex justify-end gap-[24px]">
          <Button variant="outlined" className="w-[96px]">
            Yes
          </Button>
          <Button className="w-[96px]">No</Button>
        </div>
      </div>
    </Modal>
  );
};
