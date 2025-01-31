import Link from 'next/link';
import { Header } from '@/components/Header';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div>
      <Header />
      <main>
        <Link href="/login" className={'regular-link'}>
          Sign In
        </Link>
        <Link href="/registration" className={'small-link'}>
          Sign Up
        </Link>
      </main>
    </div>
  );
}
