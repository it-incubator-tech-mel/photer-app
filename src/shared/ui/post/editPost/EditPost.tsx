import { useState } from 'react';
import { Textarea } from '../../textarea/Textarea';
import { Button } from '../../button/Button';
import Image from 'next/image';
import { IconSprite } from '../../icon/IconSprite';
import { Nicname } from '../nicname/Nicname';

const MAX_SYMBOL_COUNT = 500;

type Props = { onClose: () => void };
export const EditPost = ({ onClose }: Props) => {
  const [description, setDescription] = useState('');
  const [symbolCount, setSymbolCount] = useState(0);

  const handleChange = (text: string): void => {
    if (text.length <= MAX_SYMBOL_COUNT) {
      setSymbolCount(text.length);
      setDescription(text);
    }
  };

  return (
    <div className="bg-dark-300 border-dark-100 flex w-full flex-col rounded-[2px] border-[1px]">
      <div className="border-dark-100 flex justify-between border-b-[1px] px-[24px] py-[12px]">
        <h1 className="text-[20px] font-bold">Edit Post</h1>
        <button onClick={onClose} className="outline-none">
          <IconSprite iconName="close" />
        </button>
      </div>
      <div className="flex h-full">
        <Image
          src={'/images/confirmed.png'}
          alt={'icon'}
          width={500}
          height={500}
        />
        <div className="flex flex-col items-end justify-between px-[24px] pb-[24px]">
          <div className="flex-col">
            <Nicname />
            <div className="flex flex-col items-end justify-between pb-[32px]">
              <div className="flex flex-col items-end">
                <Textarea
                  label="Add publication descriptions"
                  value={description}
                  onValueChange={handleChange}
                />
                <span className="text-light-900">
                  {symbolCount}/{MAX_SYMBOL_COUNT}
                </span>
              </div>
            </div>
          </div>
          <Button>Save Change</Button>
        </div>
      </div>
    </div>
  );
};
