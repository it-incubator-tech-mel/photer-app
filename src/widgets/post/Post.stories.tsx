import { Meta, StoryObj } from '@storybook/react';
import { Post } from './Post';

export default {
  title: 'Widgets/Post',
  component: Post,
} as Meta<typeof Post>;

type Story = StoryObj<typeof Post>;

export const Default: Story = {};
