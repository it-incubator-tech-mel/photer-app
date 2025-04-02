import { Meta, StoryObj } from '@storybook/react';
import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from './sidebar-provider';
import { SidebarTrigger } from './sidebar-trigger';

const meta = {
  component: AppSidebar,
  title: 'Components/App-sidebar',
  tags: ['autodocs'],
} satisfies Meta<typeof AppSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex h-screen">
      <SidebarProvider>
        <div className="w-64">
          <AppSidebar />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <SidebarTrigger />
        </div>
      </SidebarProvider>
    </div>
  ),
};
