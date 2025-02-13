import { Header } from '@/components/header/Header';
import { ReactElement } from 'react';
import { Card, IconSprite, Input, Checkbox, Button } from '@/components';
import Link from 'next/link';

export default function Page(): ReactElement {
  return (
    <>
      <Header />
      <Card className="m-auto mt-6 flex h-162 w-[378px] flex-col items-center">
        <h1 className="h1-text mt-[23px]">Sign Up</h1>
        <div className="mt-[13px] flex gap-15">
          <IconSprite
            iconName="google"
            width="36"
            height="36"
            className="fill-red-500"
          />
          <IconSprite
            iconName="github"
            width="36"
            height="36"
            className="fill-white"
          />
        </div>
        <div className="m-6 mx-auto">
          <Input className="w-[330px]" label={'Username'} />
          <Input className="w-[330px]" label={'Email'} />
          <Input className="w-[330px]" label={'Password'} />
          <Input className="w-[330px]" label={'Password confirmation'} />
          <div className="flex items-center justify-center gap-3">
            <Checkbox className="" id="terms" />
            <label htmlFor="terms" className="small-text">
              I agree to the{' '}
              <Link
                href="/terms-of-service"
                className="text-accent-300 underline"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy-policy"
                className="text-accent-300 underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          <Button className="my-5 w-[330px]">Sign Up</Button>
          <p className="regular-text-16 text-center">Do you have an account?</p>
          <Button variant="text" className="mt-1 w-[330px]">
            Sign In
          </Button>
        </div>
      </Card>
    </>
  );
}
