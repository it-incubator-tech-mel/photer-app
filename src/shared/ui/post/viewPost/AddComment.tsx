import { Button } from '@/shared/ui/button/Button';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import React, { useState } from 'react';

export const AddComment = () => {
  const [onWriteComment, setOnWriteComment] = useState(false);

  return (
    <div className="flex px-[24px] py-[18px]">
      {onWriteComment ? (
        <>
          <Textarea rows={1} placeholder="Write a comment..." />
          <Button variant="text" className="border-hidden outline-none">
            Publish
          </Button>
        </>
      ) : (
        <Button
          variant="text"
          className="text-light-900 hover:text-light-900 pl-0 font-light"
          onClick={() => setOnWriteComment(true)}
        >
          Add a Comment...
        </Button>
      )}
    </div>
  );
};
