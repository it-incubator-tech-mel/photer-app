import { IconSprite } from '@/shared/ui/icon/IconSprite';
import Image from 'next/image';

export const ViewComment = () => {
  return (
    <div className="flex gap-[12px]">
      <div className="flex h-[36px] min-w-[36px] items-center justify-center overflow-hidden rounded-full object-cover">
        <Image
          src={'/images/expired.png'}
          alt={'icon'}
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-light-100">
          <span className="mr-1 font-bold">Nicname</span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="text-light-900 flex gap-[12px]">
          <span>2 Hours ago</span>
          <span>Like: 1</span>
          <span>Answer</span>
        </div>
      </div>
      <div className="flex h-full max-h-[44px] items-end">
        <IconSprite
          iconName="heart"
          className="cursor-pointer"
          fill="#CC1439"
        />
      </div>
    </div>
  );
};
