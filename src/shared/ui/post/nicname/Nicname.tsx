import Image from 'next/image';
import { CircleAvatar } from '../circleAvatar/CircleAvatar';

export const Nicname = (props: {}) => {
  return (
    <div className="flex items-center gap-[12px] py-[12px]">
      <CircleAvatar src={'/images/expired.png'} />
      <h2 className="font-bold">Nicname</h2>
    </div>
  );
};
