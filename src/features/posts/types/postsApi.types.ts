export type Items = {
  id: string;
  description: string;
  photos: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostsResponse = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: Items[];
};
