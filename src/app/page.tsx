import Link from 'next/link';
import { Header } from '@/components/Header';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div>
      <Header />
      <main>
        <Link href="/login">Sign In</Link>
        <Link href="/registration">Sign Up</Link>
      </main>
    </div>
  );
}
