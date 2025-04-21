export const mockUserCount = async (): Promise<number> => {
  const mockUsers = [
    { id: 'u1', username: 'john_doe' },
    { id: 'u2', username: 'jane_smith' },
    { id: 'u3', username: 'alice_wonder' },
    { id: 'u4', username: 'bob_builder' },
    { id: 'u5', username: 'charlie_day' },
  ];

  return mockUsers.length;
};
