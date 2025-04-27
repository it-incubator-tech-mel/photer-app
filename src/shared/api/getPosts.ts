// src/shared/api/getPosts.ts
import { Post } from '@/entities/post/model/types';

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
      next: { revalidate: 60 }, // ISR: обновлять каждые 60 сек при новом запросе
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch posts');

    return await res.json();
  } catch (e) {
    console.error('SSR getPosts error:', e);
    return [];
  }
}
////////////////////////////////////
