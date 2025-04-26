'use client';

import { Post } from '@/entities/post/model/types';
import React from 'react';

type Props = {
  post: Post;
};

export const PostModal: React.FC<Props> = ({ post }) => {
  return (
    <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="bg-dark-800 w-full max-w-3xl rounded-lg p-6 shadow-lg">
        <h2 className="text-light-100 mb-4 text-2xl font-bold">
          Post #{post.id}
        </h2>
        <p className="text-light-200 mb-4">
          {post.description || 'No description'}
        </p>

        <div className="flex flex-wrap gap-4">
          {post.photo.map((photo) => (
            <img
              key={photo.id}
              src={photo.photoUrl}
              alt={`Photo ${photo.id}`}
              className="h-48 rounded object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
///////////////////////////////////////////
