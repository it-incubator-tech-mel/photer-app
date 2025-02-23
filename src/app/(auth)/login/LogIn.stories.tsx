import type { Meta, StoryObj } from '@storybook/react';
import LogIn from './page';
import AuthLayout from '../layout';
import RootLayout from '@/app/layout';
import StoreWrapper from '@/store/StoreWrapper';
import { Inter } from 'next/font/google';

const meta = {
  title: 'Pages',
  component: LogIn,
  decorators: [
    (Story) => (
      <body
        className={`${inter.variable} bg-dark-900 regular-text-16 text-light-100`}
      >
        <StoreWrapper>
          <AuthLayout>
            <Story />
          </AuthLayout>
        </StoreWrapper>
      </body>
    ),
  ],
} as Meta<typeof LogIn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {};
