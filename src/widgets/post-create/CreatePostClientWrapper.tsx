// src/widgets/post-create/CreatePostClientWrapper.tsx
'use client';

import { useRouter } from 'next/navigation';
import { PostCreationWizard } from '@/features/postCreate';

export function CreatePostClientWrapper() {
  const router = useRouter();

  return <PostCreationWizard exitSubscriberAction={() => router.back()} />;
}
