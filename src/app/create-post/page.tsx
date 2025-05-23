// src/app/create-post/page.tsx
'use client';

import { PostCreationWizard } from '@/features/postCreate';
import { useRouter } from 'next/navigation';

export default function CreatePost(): React.ReactElement {
  const router = useRouter();
  return <PostCreationWizard exitSubscriberAction={() => router.back()} />;
}
