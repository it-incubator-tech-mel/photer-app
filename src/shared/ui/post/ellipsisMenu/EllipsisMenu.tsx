import { useState } from 'react';
import { IconSprite } from '../../icon/IconSprite';
import { SpriteName } from 'public/icons/spriteNames';

type MenuItem = { title: string; iconName: SpriteName; callback: () => void };

type Props = { menuItems: MenuItem[] };

export const EllipsisMenu = ({ menuItems }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer pr-[24px] outline-none"
      >
        <IconSprite iconName="more-horizontal" />
      </button>
      {isOpen && (
        <div className="bg-dark-900 border-dark-100 absolute top-[25px] right-[24px] flex flex-col gap-[12px] rounded-[2px] border-[1px] p-[12px]">
          {menuItems.map((item: MenuItem) => (
            <button
              key={item.title}
              onClick={() => {
                setIsOpen(false);
                item.callback();
              }}
              className="flex cursor-pointer items-center gap-[12px] whitespace-nowrap"
            >
              <IconSprite iconName={item.iconName} />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
