import { Button, Checkbox } from '@/shared/ui';
import { Modal } from '@/widgets/modal/Modal';
import { ReactNode, useState } from 'react';

type Props = {
  isOpen: boolean;
  callback: () => void;
  onClose: () => void;
};

export const AcceptRenewalNotify = ({
  isOpen,
  onClose,
  callback,
}: Props): ReactNode => {
  const [isAccepted, setIsAccepted] = useState(false);
  return (
    <div>
      <Modal
        open={isOpen}
        size="sm"
        onClose={onClose}
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
          <Button
            onClick={() => {
              callback();
              setIsAccepted(false);
            }}
            disabled={!isAccepted}
          >
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};
