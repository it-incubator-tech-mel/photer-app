import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import flagRus from '@/components/button/icons/ru-flag.png';
import { ButtonIcon } from './buttonIcon';
import flagEng from '@/components/button/icons/uk-flag.png';
import { JSX } from 'react';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  decorators: [
    (Story): JSX.Element => (
      <div style={{ backgroundColor: '#121212', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Rus: Story = {
  args: {
    icon: <Image src={flagRus} alt="Рус" width={24} height={24} />,
    children: 'Русский',
  },
};
export const Eng: Story = {
  args: {
    icon: <Image src={flagEng} alt="Eng" width={24} height={24} />,
    children: 'English',
  },
};
