'use client';
import { ReactElement } from 'react';
import { Card } from '@/components';
import { Input } from '@/components/input/Input';
import { Button } from '@/components/button/Button';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ForgotPasswordPage(): ReactElement {
  return (
    <Card className={'max-w-sm p-6'}>
      <h1 className={'h1-text mb-9 text-center'}>Forgot Password</h1>
      <form>
        <Input type={'email'} label={'Email'} placeholder={'Epam@epam.com'} />
        <p className={'regular-text-14 text-light-900'}>
          Enter your email address and we will send you further instructions
        </p>
        <div className={'mt-4 flex flex-col items-center gap-6'}>
          <Button className={'w-full'}>Send Link</Button>
          <Button variant={'text'} className={'w-full'} asChild>
            <Link href={'/login'}>Back to Sign In</Link>
          </Button>
          <ReCAPTCHA
            sitekey={'6Ldd-9YqAAAAAIW0yWxfHAqcOOMdElboBEOOj4Bc'}
            theme={'dark'}
          />
        </div>
      </form>
    </Card>
  );
}
