import type { Meta, StoryObj } from '@storybook/react';

import { cn } from '@/shared/lib/cn';
import { Separator } from './separator';

const meta = {
  component: Separator,
  title: 'Components/Separator',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    className: 'my-4',
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="flex w-full flex-col">
      <div className={'text-light-100'}>Content above</div>
      <Separator {...args} className={cn('bg-dark-300', args.className)} />
      <div className={'text-light-100'}>Content below</div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-20 items-center">
      <div className={'text-light-100'}>Left content</div>
      <Separator {...args} className={cn('bg-dark-300 mx-4', args.className)} />
      <div className={'text-light-100'}>Right content</div>
    </div>
  ),
};
