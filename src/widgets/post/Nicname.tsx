import { CircleAvatar } from '@/shared/ui/circleAvatar/CircleAvatar';

export const Nicname = () => {
  return (
    <div className="flex items-center gap-[12px] py-[12px]">
      <CircleAvatar src={'/images/expired.png'} />
      <h3 className="text-light-100 font-bold">Nicname</h3>
    </div>
  );
};
