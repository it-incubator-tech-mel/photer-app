import { useEffect, useRef, useState } from 'react';
import { Textarea } from '../../textarea/Textarea';
import { Button } from '../../button/Button';
import Image from 'next/image';
import { IconSprite } from '../../icon/IconSprite';
import { Nicname } from '../nicname/Nicname';
import { ConfirmClose } from '../confirmClose/ConfirmClose';

const MAX_SYMBOL_COUNT = 500;

type Props = { onClose: () => void };

export const EditPost = ({ onClose }: Props) => {
  const initialDescription = 'Test description'; // Начальное значение
  const [description, setDescription] = useState(initialDescription);
  const editPostRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef(description); // Реф для актуального значения
  const [isPostChanged, setIsPostChanged] = useState(false);

  const handleChange = (text: string): void => {
    if (text.length <= MAX_SYMBOL_COUNT) {
      setDescription(text);
    }
  };

  const confirmChange = (): void => {
    if (initialDescription === descriptionRef.current) {
      onClose();
    } else {
      setIsPostChanged(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      editPostRef.current &&
      !editPostRef.current.contains(event.target as Node)
    ) {
      confirmChange();
    }
  };

  useEffect(() => {
    descriptionRef.current = description;
  }, [description]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={editPostRef}
      className="bg-dark-300 border-dark-100 flex w-full flex-col rounded-[2px] border-[1px]"
    >
      <ConfirmClose open={isPostChanged} />
      <div className="border-dark-100 flex justify-between border-b-[1px] px-[24px] py-[12px]">
        <h1 className="text-[20px] font-bold">Edit Post</h1>
        <button onClick={confirmChange} className="outline-none">
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
                  {description.length}/{MAX_SYMBOL_COUNT}
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
