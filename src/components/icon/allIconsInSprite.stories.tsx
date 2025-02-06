import { Meta, StoryObj } from '@storybook/react';
import { spriteNames } from 'public/icons/spriteNames';
import { IconSprite } from './iconSprite';

export default {
  title: 'Components/Icon/IconSprite',
  component: IconSprite,
} as Meta<typeof IconSprite>;

type Story = StoryObj<typeof IconSprite>;

export const AllIconsInSprite = () => (
  <div
    style={{
      display: 'flex',
      gap: '40px',
      padding: '40px',
      flexWrap: 'wrap',
      maxWidth: '80%',
      margin: '0 auto',
    }}
  >
    {spriteNames.map((name) => (
      <IconSprite key={name} iconName={name} />
    ))}
  </div>
);
