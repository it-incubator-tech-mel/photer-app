import React, { useState } from 'react';
import { EditPost } from './editPost/EditPost';
import ViewPost from './viewPost/ViewPost';

export const Post = (props: {}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="max-w-[1280px]">
      {isEdit ? (
        <EditPost onClose={() => setIsEdit(false)} />
      ) : (
        <ViewPost setIsEdit={setIsEdit} />
      )}
    </div>
  );
};
