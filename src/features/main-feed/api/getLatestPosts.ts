import { Post } from '../model/post.types';

export const getLatestPosts = async (): Promise<Post[]> => {
  // временно мокаем - Заглушка, которая будет позже ходить в реальный API
  return [
    {
      id: '1',
      author: {
        id: 'u1',
        username: 'john_doe',
        avatarUrl: '/avatars/john.png',
      },
      imageUrl: '/posts/post1.jpg',
      description: 'Первый пост',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      author: {
        id: 'u2',
        username: 'jane_smith',
        avatarUrl: '/avatars/jane.png',
      },
      imageUrl: '/posts/post2.jpg',
      description: 'Второй пост',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      author: {
        id: 'u3',
        username: 'alice_wonder',
        avatarUrl: '/avatars/alice.png',
      },
      imageUrl: '/posts/post3.jpg',
      description: 'Третий пост',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      author: {
        id: 'u4',
        username: 'bob_builder',
        avatarUrl: '/avatars/bob.png',
      },
      imageUrl: '/posts/post4.jpg',
      description: 'Четвёртый пост',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      author: {
        id: 'u5',
        username: 'charlie_day',
        avatarUrl: '/avatars/charlie.png',
      },
      imageUrl: '/posts/post5.jpg',
      description: 'Пятый пост',
      createdAt: new Date().toISOString(),
    },
    {
      id: '6',
      author: {
        id: 'u6',
        username: 'diana_prince',
        avatarUrl: '/avatars/diana.png',
      },
      imageUrl: '/posts/post6.jpg',
      description: 'Шестой пост',
      createdAt: new Date().toISOString(),
    },
  ];
};
