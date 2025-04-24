// export type RootDataItem = {
//   id: number;
//   description: string;
//   photo: string[];
//   userId: number;
//   createdAt: string;
//   updatedAt: string;
//   status: string;
//   isDeleted: boolean;
// };
// export type ProfilePostsResponseTypes = RootDataItem[];

export type Photo = {
  id: number;
  photoUrl: string;
  createdAt: string;
};

export type PostItem = {
  id: number;
  description: string;
  userId: number;
  photo: Photo[];
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;
};
