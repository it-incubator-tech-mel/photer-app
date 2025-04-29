// src/shared/api/post.ts

import { Post } from '@/entities/post/model/types';

export async function getPostById(postId: string): Promise<Post | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`;
    console.log('Request URL:', url); // Логируем URL
    const res = await fetch(url, {
      next: { revalidate: 60 }, // или cache: 'no-store' если нужно
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error('Failed to fetch post by ID', error);
    return null;
  }
}
///////////////////////////////////////////
