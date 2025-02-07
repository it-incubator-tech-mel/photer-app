import { SpriteName } from 'public/icons/spriteNames';
import { ComponentPropsWithoutRef, ReactElement } from 'react';

type Props = {
  iconName: SpriteName;
} & ComponentPropsWithoutRef<'svg'>;

export const IconSprite = ({
  iconName,
  width = '24',
  height = '24',
  className = 'fill-white',
  ...rest
}: Props): ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      {...rest}
    >
      <use xlinkHref={`/icons/sprite.svg#${iconName}`} />
    </svg>
  );
};
