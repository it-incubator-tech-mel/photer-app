export async function getPostById(postId: string) {
  // пока просто заглушка
  return {
    id: postId,
    title: 'Пример поста',
    content: 'Контент этого поста...',
    author: {
      id: '123',
      name: 'Иван',
    },
  };
}
