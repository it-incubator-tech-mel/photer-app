import React, { useState } from 'react';
import { EditPost } from './editPost/EditPost';
import ViewPost from './viewPost/ViewPost';

export const Post = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-[972px]">
      {isEdit ? (
        <EditPost onClose={() => setIsEdit(false)} />
      ) : (
        <ViewPost setIsEdit={setIsEdit} />
      )}
    </div>
  );
};
