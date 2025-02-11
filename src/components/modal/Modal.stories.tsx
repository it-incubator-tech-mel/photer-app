import { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import { Modal, ModalProps } from './Modal';
import { Button } from '@/components/button/Button';

const meta = {
  component: Modal,
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalWithState = (args: ModalProps): ReactElement => {
  const [open, setOpen] = useState(false);

  const handleModalClosed = (): void => {
    setOpen(false);
  };

  const handleModalOpened = (): void => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleModalOpened}>Open modal</Button>
      <Modal {...args} onClose={handleModalClosed} open={open} />
    </div>
  );
};

export const Default: Story = {
  args: {
    open: true,
    title: 'Modal',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptatum voluptas velit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptatum voluptas velit',
  },
  render: (args) => <ModalWithState {...args} />,
};

export const Small: Story = {
  args: {
    open: true,
    title: 'Modal',
    size: 'sm',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptatum voluptas velit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptatum voluptas velit',
  },
  render: (args) => <ModalWithState {...args} />,
};

export const Big: Story = {
  args: {
    open: true,
    title: 'Modal',
    size: 'lg',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptatum voluptas velit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptatum voluptas velit',
  },
  render: (args) => <ModalWithState {...args} />,
};
