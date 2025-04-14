import { useEffect, useRef, useState } from 'react';
import { Textarea } from '../../textarea/Textarea';
import { Button } from '../../button/Button';
import Image from 'next/image';
import { IconSprite } from '../../icon/IconSprite';
import { ConfirmClose } from './ConfirmClose';
import { Nicname } from '../Nicname';
import { Carousel } from '../../carousel/Carousel';

const MAX_SYMBOL_COUNT = 500;

const slides = [
  <Image src={'/images/confirmed.png'} alt={'icon'} width={500} height={500} />,
  <Image
    src={'/images/confirmed.png'}
    alt={'icon'}
    width={500}
    height={500}
    className="flex-1 object-cover"
  />,
  <Image
    src={'/images/confirmed.png'}
    alt={'icon'}
    width={500}
    height={500}
    className="flex-1 object-cover"
  />,
];

type Props = { onClose: () => void };

export const EditPost = ({ onClose }: Props) => {
  const initialDescription = 'Test description'; // Начальное значение
  const [description, setDescription] = useState(initialDescription);
  const editPostRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef(description); // Реф для актуального значения
  const [openConfirmClose, setOpenConfirmClose] = useState(false);

  const handleChange = (text: string): void => {
    if (text.length <= MAX_SYMBOL_COUNT) {
      setDescription(text);
    }
  };
  const handleAccept = () => {
    setOpenConfirmClose(false);
    onClose();
  };
  const handleDecline = () => {
    setOpenConfirmClose(false);
    onClose();
  };

  const confirmChange = (): void => {
    if (initialDescription === descriptionRef.current) {
      onClose();
    } else {
      setOpenConfirmClose(true);
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
      <div className="border-dark-100 flex justify-between border-b-[1px] px-[24px] py-[12px]">
        <h2 className="text-light-100 text-[20px] font-bold">Edit Post</h2>
        <button onClick={confirmChange} className="outline-none">
          <IconSprite iconName="close" />
        </button>
      </div>
      <div className="flex h-full">
        <Carousel slides={slides} className="flex-1" />
        <div className="flex flex-1 flex-col justify-between px-[24px] pb-[24px]">
          <Nicname />
          <div className="flex flex-col items-end justify-between pb-[32px]">
            <Textarea
              label="Add publication descriptions"
              value={description}
              onValueChange={handleChange}
              className="w-full"
            />
            <span className="text-light-900">
              {description.length}/{MAX_SYMBOL_COUNT}
            </span>
          </div>
          <Button className="ml-auto">Save Change</Button>
        </div>
      </div>
      <ConfirmClose
        open={openConfirmClose}
        onAccept={handleAccept}
        onDecline={handleDecline}
        close={() => setOpenConfirmClose(false)}
      />
    </div>
  );
};
