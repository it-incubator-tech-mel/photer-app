'use client';

import { ReactElement } from 'react';
import { PostItem } from '@/features/posts/types/postsApi.types';

type Props = {
  posts?: PostItem[];
};

export const PostsList = ({ posts }: Props): ReactElement => {
  return (
    <div className={'mt-12 flex flex-wrap gap-3'}>
      {posts?.map((post) => (
        <img
          key={post.id}
          src={post.photo[0]?.photoUrl}
          alt={'post'}
          className={'h-57 w-58 object-cover'}
        />
      ))}
    </div>
  );
};
