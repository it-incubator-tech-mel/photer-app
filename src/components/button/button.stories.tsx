import { Button } from './button';
import { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Hello',
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

export const AsLink: Story = {
  args: {
    ...Primary.args,
    asChild: true,
    children: <Link href={'/'}>Link</Link>,
  },
};
