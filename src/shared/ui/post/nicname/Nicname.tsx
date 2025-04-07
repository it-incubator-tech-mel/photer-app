import Image from 'next/image';
export const Nicname = (props: {}) => {
  return (
    <div className="flex items-center gap-[12px] py-[12px]">
      <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full object-cover">
        <Image
          src={'/images/expired.png'}
          alt={'icon'}
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="font-bold">Nicname</h2>
    </div>
  );
};
