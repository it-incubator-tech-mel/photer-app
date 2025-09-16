import { SelectBox } from '@/widgets/selectBox/SelectBox';
import { SelectItem } from '@/widgets/selectBox/SelectItem';
import { ReactNode } from 'react';

type Props = {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

export const SelectPageItems = ({
  pageSize,
  onPageSizeChange,
}: Props): ReactNode => {
  const pageSizeOptions = [10, 20, 50, 100];

  const handlePageSizeChange = (value: string): void => {
    onPageSizeChange(+value);
  };

  return (
    <div className="ml-4 flex items-center space-x-2">
      <span>Show</span>
      <SelectBox
        className="h-[25px] w-[65px]"
        contentClassName="w-[65px]"
        iconSize={20}
        value={pageSize.toString()}
        onValueChange={(value) => handlePageSizeChange(value)}
      >
        {pageSizeOptions.map((option) => (
          <SelectItem
            key={option}
            value={option.toString()}
            className="h-[30px]"
          >
            {option}
          </SelectItem>
        ))}
      </SelectBox>
      <span>on page</span>
    </div>
  );
};
