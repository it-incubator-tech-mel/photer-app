import Link from 'next/link';
import { ReactElement } from 'react';
import { SelectBox } from './SelectBox/SelectBox';
import ruFlag from 'public/icons/ru-flag.png';
import ukFlag from 'public/icons/uk-flag.png';
import { SelectItem } from './SelectBox/SelectItem';

export function Header(): ReactElement {
  return (
    <header className="text-light-100 mr-auto ml-auto flex h-[60px] w-full max-w-[1280px] items-center justify-between pr-[60px] pl-[60px]">
      <Link href="/" className="large-text">
        Inctagram
      </Link>
      <SelectBox defaultValue={'value2'}>
        <SelectItem value={'value1'} icon={ruFlag}>
          Russian
        </SelectItem>
        <SelectItem value={'value2'} icon={ukFlag}>
          English
        </SelectItem>
      </SelectBox>
    </header>
  );
}
