import { Button, IconSprite } from '@/shared/ui';
import { ReactElement } from 'react';

type SocialAuthButtonsProps = {
  onGoogleClick?: () => void;
  onGithubClick?: () => void;
};

export function SocialAuthButtons({
  onGoogleClick,
  onGithubClick,
}: SocialAuthButtonsProps): ReactElement {
  return (
    <div className="mt-[13px] flex gap-3">
      <Button onClick={onGoogleClick} asChild variant="text">
        <IconSprite
          iconName="google"
          width="36"
          height="36"
          className="cursor-pointer fill-red-500"
        />
      </Button>
      <Button onClick={onGithubClick} asChild variant="text">
        <IconSprite
          iconName="github"
          width="36"
          height="36"
          className="cursor-pointer fill-white"
        />
      </Button>
    </div>
  );
}
