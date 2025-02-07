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

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    ...Primary.args,
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    ...Primary.args,
    variant: 'text',
  },
};

export const Icon: Story = {
  args: {
    ...Primary.args,
    variant: 'icon',
  },
};
