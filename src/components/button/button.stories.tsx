import { Button } from './button';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Hello',
    onClick: (): void => {
      alert('hello');
    },
    title: 'Click to alert hello',
  },
};

export const Secondary = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const Outlined = {
  args: {
    ...Primary.args,
    variant: 'outlined',
  },
};

export const Text = {
  args: {
    ...Primary.args,
    variant: 'text',
  },
};

export const Icon = {
  args: {
    ...Primary.args,
    variant: 'icon',
  },
};
