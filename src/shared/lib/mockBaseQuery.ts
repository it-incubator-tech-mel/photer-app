// shared/lib/mockBaseQuery.ts
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

export const mockBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args) => {
  // Моковые данные
  const mockResponses = {
    '/auth/me': { userId: 1, email: 'user@example.com' },
    '/posts': [
      { id: 1, title: 'Post 1', body: 'This is post 1', author: 'User' },
      { id: 2, title: 'Post 2', body: 'This is post 2', author: 'User' },
    ],
    '/avatars/user.png': 'fake-avatar-url', // Заглушка для аватарки
  };

  // Если args — это строка (url), то используем её для поиска
  if (typeof args === 'string') {
    // Проверяем конкретные URL
    if (args === '/auth/me') {
      return { data: mockResponses['/auth/me'] };
    }

    if (args === '/posts') {
      return { data: mockResponses['/posts'] };
    }

    if (args.startsWith('/avatars/')) {
      return { data: mockResponses['/avatars/user.png'] }; // Заглушка для изображений
    }
  }

  // Если args — это объект, можно обрабатывать параметры запроса, но это зависит от структуры FetchArgs
  // В данном примере возвращаем ошибку для всех остальных случаев
  return { error: { status: 'CUSTOM_ERROR', error: 'Unknown endpoint' } };
};
