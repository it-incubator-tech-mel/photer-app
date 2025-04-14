import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import Image from 'next/image';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Carousel>;

type Story = StoryObj<typeof Carousel>;

const slides = [
  <Image
    src={'/images/confirmed.png'}
    alt={'icon'}
    width={500}
    height={500}
    className="bg-light-100 flex-1 object-cover"
  />,
  <Image
    src={'/images/confirmed.png'}
    alt={'icon'}
    width={500}
    height={500}
    className="flex-1 object-cover"
  />,
  <div className="bg-light-100 flex h-[340px] w-full items-center justify-center">
    'div': Slide 5
  </div>,
];
// const slides = ['slide 1', 'slide 2', 'slide 3', 'slide 4', 'slide 5'];
export const Default: Story = {
  args: {
    slides: slides,
    className: 'max-w-[500px]',
    // type: 'text',
    // label: 'Some label',
    // placeholder: 'Type your message',
    // className: 'w-[279px]',
  },
};
