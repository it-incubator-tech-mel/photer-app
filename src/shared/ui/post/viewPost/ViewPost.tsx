'use client';
import Image from 'next/image';
import { EllipsisMenu } from '../ellipsisMenu/EllipsisMenu';
import { Nicname } from '../nicname/Nicname';
import { Comment } from '../comment/Comment';
import { PostInfo } from '../postInfo/PostInfo';
import { Textarea } from '../../textarea/Textarea';
import { Button } from '../../button/Button';
import { useState } from 'react';

type Props = { setIsEdit: (value: boolean) => void };

export default function ViewPost({ setIsEdit }: Props) {
  const [onWriteComment, setOnWriteComment] = useState(false);
  return (
    <div className="bg-dark-300 border-dark-100 flex w-full rounded-[2px] border-[1px]">
      <Image
        src={'/images/confirmed.png'}
        alt={'icon'}
        width={500}
        height={500}
      />
      <div className="flex w-100 flex-col">
        <div className="border-dark-100 flex justify-between border-b-[1px]">
          <Nicname />
          <EllipsisMenu
            menuItems={[
              {
                title: 'Edit post',
                iconName: 'edit-2-outline',
                callback: () => {
                  setIsEdit(true);
                },
              },
              {
                title: 'Delete post',
                iconName: 'trash-outline',
                callback: () => {
                  setIsEdit(false);
                },
              },
            ]}
          />
        </div>
        <div className="bg-dark-300 border-dark-100 flex flex-col gap-[15px] pt-[19px] pb-[8px]">
          <Comment />
          <Comment />
          <Comment />
        </div>
        <PostInfo />
        <div className="flex">
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
      </div>
    </div>
  );
}
