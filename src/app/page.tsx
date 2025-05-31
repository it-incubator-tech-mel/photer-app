// src/app/page.tsx
import { ReactElement } from 'react';

export default async function HomePage(): Promise<ReactElement> {
  return (
    <main className="flex-1">
      <h1 className="text-light-100 mb-4 px-6 text-2xl font-bold">
        Лента постов
      </h1>
    </main>
  );
}
