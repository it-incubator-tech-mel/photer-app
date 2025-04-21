export async function getUserProfile(userId: string) {
  // заглушка профиля
  return {
    id: userId,
    name: 'Алексей',
    avatar: '/avatar.png',
    bio: 'Просто разработчик',
    posts: [],
  };
}
