'use client';
import Image from 'next/image';
import confirmed from './confirmed.png';
import { EllipsisMenu } from './ellipsisMenu/EllipsisMenu';

export default function Post() {
  return (
    <div className="bg-dark-300 border-dark-100 flex rounded-[2px] border-[1px]">
      <Image
        src={'/images/confirmed.png'}
        alt={'icon'}
        width={500}
        height={500}
      />
      <div className="flex w-100 flex-col">
        <div className="border-dark-100 flex justify-between border-b-[1px] py-[18px]">
          title
          <EllipsisMenu
            menuItems={[
              {
                title: 'Edit',
                iconName: 'edit-2-outline',
                callback: () => {},
              },
              {
                title: 'Edit',
                iconName: 'edit-2-outline',
                callback: () => {},
              },
            ]}
          />
        </div>
        <div>content</div>
      </div>
    </div>
  );
}
