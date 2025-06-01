import Image from 'next/image';
import { ReactNode } from 'react';
import { useTimeAgo } from '../../hooks/view/useTimePost';

type Props = {
  comment: string;
  dateTime: string;
};

export const PostDescription = ({ comment, dateTime }: Props): ReactNode => {
  const timeAgo = useTimeAgo(dateTime);
  return (
    <div className="relative flex gap-[12px]">
      <div className="flex h-[36px] min-w-[36px] items-center justify-center overflow-hidden rounded-full object-cover">
        <Image
          src={'/images/expired.png'}
          alt={'icon'}
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col">
        <p className="text-light-100 text-[14px]">
          <span className="mr-1 font-bold">Nicname</span>
          {comment}
        </p>
        <div className="flex justify-between">
          <div className="text-light-900 flex gap-[12px] text-[12px]">
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
