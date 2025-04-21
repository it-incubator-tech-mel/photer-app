export interface Post {
  id: string;
  author: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  imageUrl: string;
  description: string;
  createdAt: string;
}
