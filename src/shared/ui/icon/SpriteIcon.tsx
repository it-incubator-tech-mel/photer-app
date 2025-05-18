import { cn } from '@/shared/lib/cn';
import { SpriteName } from 'public/icons/spriteNames';

type Props = {
  name: SpriteName;
  size?: number;
  className?: string;
};

export function SpriteIcon({ name, size = 20, className }: Props) {
  return (
    <svg
      className={cn('text-light-100 fill-current', className)}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <use href={`#${name}`} />
    </svg>
  );
}
