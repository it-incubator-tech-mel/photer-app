import { ConfirmEmail } from '@/components';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/ConfirmEmail',
  component: ConfirmEmail,
} satisfies Meta<typeof ConfirmEmail>;

const Template: StoryFn = () => <ConfirmEmail />;

export const Default = Template.bind({});
