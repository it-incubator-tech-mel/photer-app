// src/entities/post/model/types.ts

export type Post = {
  id: string;
  description: string;
  photos: string[]; // здесь хранятся imageUrl
  userId: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};
