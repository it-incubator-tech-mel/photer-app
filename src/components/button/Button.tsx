'use client';
import React, { JSX } from 'react';
import Image from 'next/image';

type ButtonProps = {
  buttonType?: 'default' | 'gray' | 'outlined' | 'ghost' | 'icon';
  onClick?: () => void;
  width?: number;
  icon?: 'ru' | 'en';
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonTest = ({
  buttonType = 'default',
  onClick,
  width,
  icon,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  const classesMap = {
    default:
      'bg-accent-500 active:bg-accent-700 hover:bg-accent-100 disabled:bg-accent-900 focus:border-accent-700 m-6 h-9 w-[182px] rounded-[2px] border-2 border-transparent',
    gray: 'bg-dark-300 hover:bg-dark-100 disabled:bg-dark-500 focus:border-accent-300 m-6 h-9 w-[182px] rounded-[2px] border border-transparent active:bg-[#212121]',
    outlined:
      'text-accent-500 hover:text-accent-100 disabled:text-accent-900 focus:text-accent-700 active:text-accent-700 border-accent-500 hover:border-accent-100 disabled:border-accent-900 focus:border-accent-700 active:border-accent-700 border-accent-500 m-6 h-9 w-[182px] rounded-[2px] border',
    ghost:
      'text-accent-500 hover:text-accent-100 disabled:text-accent-900 focus:text-accent-500 active:text-accent-700 focus:border-accent-700 m-6 h-9 w-25 rounded-[2px] border-2 border-transparent',
    icon: 'm-6 bg-dark-300 flex items-center justify-center px-3 py-[6px] w-[115px]',
  };

  const appliedClass = icon ? classesMap['icon'] : classesMap[buttonType];

  return (
    <button
      {...props}
      onClick={onClick}
      className={`${appliedClass} h3-text text-light-100`}
      style={width ? { width } : undefined}
    >
      {icon && (
        <Image
          src={`/flags/${icon}.svg`}
          alt={icon}
          width={24}
          height={24}
          className="mr-[10px]"
          onError={(e) => {
            e.currentTarget.outerHTML = `<span class="mr-[10px]">${e.currentTarget.alt}</span>`;
          }}
        />
      )}
      {children}
    </button>
  );
};

export default ButtonTest;
