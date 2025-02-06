import { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/button/Button';
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    buttonType: {
      control: 'select',
      options: ['default', 'gray', 'outlined', 'ghost', 'icon'],
    },
    disabled: { control: 'boolean' },
    width: { control: 'number' },
    icon: {
      control: 'select',
      options: ['ru', 'en', null],
    },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
    buttonType: 'default',
  },
};

export const Gray: Story = {
  args: {
    ...Default.args,
    buttonType: 'gray',
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    buttonType: 'outlined',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    buttonType: 'ghost',
  },
};

export const IconButtonRU: Story = {
  args: {
    buttonType: 'icon',
    icon: 'ru',
    children: 'Russian', // Добавлен текст
  },
};

export const IconButtonEN: Story = {
  args: {
    buttonType: 'icon',
    icon: 'en',
    children: 'English', // Добавлен текст
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
