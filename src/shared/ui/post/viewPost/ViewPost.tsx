'use client';
import Image from 'next/image';
import { Nicname } from '../Nicname';
import { AddComment } from './AddComment';
import { EllipsisMenu } from './EllipsisMenu';
import { ViewComment } from './ViewComment';
import { PostInfo } from './PostInfo';

type Props = {
  setIsEdit: (value: boolean) => void;
};

export default function ViewPost({ setIsEdit }: Props) {
  return (
    <div className="bg-dark-300 border-dark-100 flex w-full max-w-[1280px] rounded-[2px] border-[1px]">
      <Image
        src={'/images/confirmed.png'}
        alt={'icon'}
        width={500}
        height={500}
        className="flex-1 object-cover"
      />
      <div className="flex flex-1 flex-col">
        <div className="border-dark-100 flex justify-between border-b-[1px] px-[24px]">
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
        <div className="border-dark-100 flex flex-col gap-[15px] px-[24px] pt-[19px] pb-[8px]">
          <ViewComment />
          <ViewComment />
          <ViewComment />
        </div>
        <PostInfo />
        <AddComment />
      </div>
    </div>
  );
}
