'use client';

import { ReactElement } from 'react';

// Тип для поста (можно вынести в shared/types)
interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
}

interface PostModalProps {
  post: Post;
}

export const PostModal = ({ post }: PostModalProps): ReactElement => {
  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="mb-2 text-gray-700">{post.content}</p>
      <div className="text-sm text-gray-500">Автор: {post.author.name}</div>
    </div>
  );
};
