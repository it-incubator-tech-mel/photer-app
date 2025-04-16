import { IconSprite } from '@/shared/ui';
import { Button } from '@/shared/ui/button/Button';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import React, { useState } from 'react';

export const AddComment = () => {
  const [onWriteComment, setOnWriteComment] = useState(false);

  return (
    <div className="flex px-[24px] py-[18px]">
      {onWriteComment ? (
        <div className="flex w-full justify-between">
          <Textarea placeholder="Write a comment..." className="w-full" />
          <div className="flex flex-col items-end justify-between">
            <button
              onClick={() => setOnWriteComment(false)}
              className="border-hidden outline-none"
            >
              <IconSprite iconName="close" />
            </button>
            <Button variant="text" className="border-hidden pr-0 outline-none">
              Publish
            </Button>
          </div>
        </div>
      ) : (
        <button
          className="text-light-900 hover:text-light-900 pl-0 font-light"
          onClick={() => setOnWriteComment(true)}
        >
          Add a Comment...
        </button>
      )}
    </div>
  );
};
