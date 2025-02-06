import { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

export default {
  title: 'Components/Input/Input',
  component: Input,
  argTypes: {
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: 'text',
    label: 'Some label',
    placeholder: 'Type your message',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'Error text',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
