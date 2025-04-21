'use client';

import { ReactElement } from 'react';

// Тип профиля — можешь вынести в shared/types при необходимости
interface Profile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  posts: { id: string; title: string }[]; // или уточни, если посты сложнее
}

interface UserProfileProps {
  profile: Profile;
}

export const UserProfile = ({ profile }: UserProfileProps): ReactElement => {
  return (
    <div className="p-4">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="mb-4 h-24 w-24 rounded-full"
      />
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p className="text-gray-600">{profile.bio}</p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Посты:</h2>
        {profile.posts.length === 0 ? (
          <p className="text-sm text-gray-400">Нет постов</p>
        ) : (
          <ul className="list-disc pl-5">
            {profile.posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
