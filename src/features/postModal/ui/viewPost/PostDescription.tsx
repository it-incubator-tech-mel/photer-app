import Image from 'next/image';
import { ReactNode } from 'react';
import { useTimeAgo } from '../../lib/useTimePost';

type Props = {
  comment: string;
  dateTime: string;
};

export const PostDescription = ({ comment, dateTime }: Props): ReactNode => {
  const timeAgo = useTimeAgo(dateTime);

  return (
    <div className="relative flex gap-[12px]">
      <div className="h-[36px] w-[36px] overflow-hidden rounded-full">
        <Image
          src="/images/expired.png"
          alt="icon"
          width={36}
          height={36}
          className="object-cover"
        />
      </div>
      <div className="flex w-full flex-col">
        <p className="text-light-100 text-[14px]">
          <span className="mr-1 font-bold">Nicname</span>
          {comment}
        </p>
        <div className="flex justify-between">
          <div className="text-light-900 flex gap-[12px]">
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
