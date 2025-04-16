import { useEffect, useRef, useState } from 'react';

type HookEditPost = {
  onClose: () => void;
  MAX_SYMBOL_COUNT: number;
};

export function useEditPost({ onClose, MAX_SYMBOL_COUNT }: HookEditPost) {
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
  return {
    editPostRef,
    description,
    handleChange,
    openConfirmClose,
    setOpenConfirmClose,
    confirmChange,
    handleAccept,
    handleDecline,
  };
}
