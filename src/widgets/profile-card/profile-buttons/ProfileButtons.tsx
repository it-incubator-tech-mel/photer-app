'use client';

import { Button } from '@/shared/ui';
import { ReactElement } from 'react';

type Props = {
  isOwner: boolean;
};

export const ProfileButtons = ({ isOwner }: Props): ReactElement => {
  return (
    <div className={'flex gap-3'}>
      {!isOwner && <Button variant={'primary'}>Follow</Button>}
      <Button variant={'secondary'}>
        {isOwner ? 'Profile Settings' : 'Send Message'}
      </Button>
    </div>
  );
};
