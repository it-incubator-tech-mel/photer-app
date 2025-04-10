import Image from 'next/image';
import { IconSprite } from '../../icon/IconSprite';
import { CircleAvatar } from '../circleAvatar/CircleAvatar';
import { Input } from '../../input/Input';
import { Button } from '../../button/Button';
import { Textarea } from '../../textarea/Textarea';
import { useState } from 'react';

export const PostInfo = (props: {}) => {
  return (
    <div className="border-dark-100 flex flex-col border-t-[1px] border-b-[1px] px-[24px] py-[12px]">
      <div className="flex justify-between">
        <div className="flex gap-[26px]">
          <IconSprite
            iconName="heart-outline"
            fill="white"
            className="cursor-pointer"
          />
          <IconSprite
            iconName="paper-plane"
            fill="white"
            className="cursor-pointer"
          />
        </div>
        <IconSprite
          iconName="bookmark-outline"
          fill="white"
          className="cursor-pointer"
        />
      </div>
      <div className="mt-[19px] flex items-center gap-[12px]">
        <div className="flex">
          <CircleAvatar src={'/images/expired.png'} className="z-2" />
          <CircleAvatar
            src={'/images/expired.png'}
            className="z-1 ml-[-12px]"
          />
          <CircleAvatar
            src={'/images/expired.png'}
            className="z-0 ml-[-12px]"
          />
        </div>
        <span>2 243 "Like"</span>
      </div>
      <span className="text-light-900 mt-[5px]">July 3, 2021</span>
    </div>
  );
};
