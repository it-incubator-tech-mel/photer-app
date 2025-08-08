import { Button, Checkbox } from '@/shared/ui';
import { Modal } from '@/widgets/modal/Modal';
import { useState } from 'react';

type Props = { callback: () => void };
export const ModalNofify = ({ callback }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  return (
    // <div className="fixed inset-0 items-center justify-center bg-black/50">
    <div>
      <Modal
        open={isOpen}
        size="sm"
        onClose={() => setIsOpen(false)}
        title="Create payment"
        modal={true}
      >
        Auto-renewal will be enabled with this payment. You can disable it
        anytime in your profile settings
        <div className="flex justify-between">
          <Checkbox
            label="I agree"
            onCheckedChange={(checked) => {
              if (checked === 'indeterminate') {
                setIsAccepted(false);
              } else {
                setIsAccepted(checked);
              }
            }}
          />
          <Button onClick={() => callback()} disabled={!isAccepted}>
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};
