// src/entities/post/model/types.ts
export type Photo = {
  id: number;
  photoUrl: string;
  createdAt: string;
};

export type Post = {
  id: number;
  description: string | null;
  photo: Photo[];
  userId: number;
  createdAt: string;
  updatedAt: string;
};
////////////////////////////////////
