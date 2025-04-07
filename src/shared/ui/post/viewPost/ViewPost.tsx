'use client';
import Image from 'next/image';
import { EllipsisMenu } from '../ellipsisMenu/EllipsisMenu';
import { Nicname } from '../nicname/Nicname';

type Props = { setIsEdit: (value: boolean) => void };

export default function ViewPost({ setIsEdit }: Props) {
  return (
    <div className="bg-dark-300 border-dark-100 flex w-full rounded-[2px] border-[1px]">
      <Image
        src={'/images/confirmed.png'}
        alt={'icon'}
        width={500}
        height={500}
      />
      <div className="flex w-100 flex-col">
        <div className="border-dark-100 flex justify-between border-b-[1px] py-[18px]">
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
      </div>
    </div>
  );
}
