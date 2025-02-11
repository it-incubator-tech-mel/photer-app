'use client';

import { Header } from '@/components/header/Header';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div>
      <Header withLoginBtn={true} />
      <main></main>
    </div>
  );
}
