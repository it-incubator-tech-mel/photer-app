import { Meta, StoryObj } from '@storybook/react';
import { Post } from './Post';

export default {
  title: 'Components/Post',
  component: Post,
  // parameters: {
  //   layout: 'centered',
  // },
} as Meta<typeof Post>;

type Story = StoryObj<typeof Post>;

export const Default: Story = {};
