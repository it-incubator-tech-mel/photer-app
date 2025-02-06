import { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './searchInput';

export default {
  title: 'Components/Input/SearchInput',
  component: SearchInput,
  argTypes: {
    disabled: { control: 'boolean' },
  },
} as Meta<typeof SearchInput>;

type Story = StoryObj<typeof SearchInput>;

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
