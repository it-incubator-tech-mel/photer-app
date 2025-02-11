import Link from 'next/link';
import { ReactElement } from 'react';
import { SelectBox } from './SelectBox/SelectBox';
import ruFlag from 'public/icons/ru-flag.png';
import ukFlag from 'public/icons/uk-flag.png';
import { SelectItem } from './SelectBox/SelectItem';

export function Header(): ReactElement {
  return (
    <header className="text-light-100 border-dark-300 border-b-1">
      <div className="mx-auto flex h-[60px] w-full max-w-[1280px] items-center justify-between px-[60px] max-md:px-[15px]">
        <Link href="/" className="large-text">
          Inctagram
        </Link>
        <SelectBox
          defaultValue={'value2'}
          className="bg-dark-900 border-dark-100 max-md:w-[70px] max-md:border-hidden"
        >
          <SelectItem value={'value1'} icon={ruFlag}>
            <span className="max-md:hidden">Russian</span>
          </SelectItem>
          <SelectItem value={'value2'} icon={ukFlag}>
            <span className="max-md:hidden">English</span>
          </SelectItem>
        </SelectBox>
      </div>
    </header>
  );
}
