import { ResendEmail } from '@/components';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/ResendEmail',
  component: ResendEmail,
} satisfies Meta<typeof ResendEmail>;

const Template: StoryFn = () => <ResendEmail />;

export const Default = Template.bind({});
