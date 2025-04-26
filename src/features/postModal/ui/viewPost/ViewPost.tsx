'use client';
import Image from 'next/image';
import { PostInfo } from './PostInfo';
import { ReactNode } from 'react';
import { AddComment } from './AddComment';
import { AvatarWithName } from './AvatarWithName';
import { PostDescription } from './PostDescription';
import { ViewComment } from './ViewComment';
import { Photo, PostType } from '../../lib/post.types';
import { Carousel } from '@/shared/ui/carousel/Carousel';

type Props = {
  post: PostType;
  children?: ReactNode;
};

export default function ViewPost({ post, children }: Props): ReactNode {
  return (
    <div className="bg-dark-300 border-dark-100 flex w-full max-w-[1280px] rounded-[2px] border-[1px]">
      <Carousel className="flex-1">
        {post.photo.map((item: Photo, index) => (
          <Image
            src={item.photoUrl}
            alt={'Post image'}
            key={index}
            width={500}
            height={500}
          />
        ))}
      </Carousel>
      <div className="flex flex-1 flex-col">
        <div className="border-dark-100 flex justify-between border-b-[1px] px-[24px]">
          <AvatarWithName />
          {children}
        </div>
        <div className="border-dark-100 flex flex-col gap-[15px] px-[24px] pt-[19px] pb-[8px]">
          <PostDescription comment={post.description} />
          <ViewComment />
          <ViewComment />
        </div>
        <PostInfo />
        <AddComment />
      </div>
    </div>
  );
}
