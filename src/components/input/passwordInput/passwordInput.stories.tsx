import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './passwordInput';

export default {
  title: 'Components/Input/PasswordInput',
  component: PasswordInput,
  argTypes: {
    disabled: { control: 'boolean' },
  },
} as Meta<typeof PasswordInput>;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
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
