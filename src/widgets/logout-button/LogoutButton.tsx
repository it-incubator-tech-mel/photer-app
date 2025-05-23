import { Button, IconSprite } from '@/shared/ui';
import React, { ReactElement } from 'react';

type Props = {
  openModal: () => void;
};

export function LogoutButton({ openModal }: Props): ReactElement {
  return (
    <Button
      onClick={openModal}
      variant="text"
      className="text-light-100 hover:text-light-100 active:text-light-100 focus:text-light-100 cursor-pointer border-none"
    >
      <div className="flex items-center gap-3">
        <IconSprite iconName="log-out" />
        <span className="regular-text-14">Logout</span>
      </div>
    </Button>
  );
}
