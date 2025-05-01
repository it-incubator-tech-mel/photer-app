export type Posts = {
  items: PostType[];
  page: number;
  pageSize: number;
  pagesCount: number;
  totalCount: number;
};
export type PostType = {
  id: number;
  description: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
};

export type Photo = {
  createdAt: string;
  id: number;
  photoUrl: string;
};
export type ErrorResponse = {
  error: ErrorIncorrectValue | ErrorServerError | ErrorNotFound;
};

type ErrorServerError = {
  status: 500;
  data: {
    message: string;
  };
};

type ErrorIncorrectValue = {
  status: 400;
  errorsMessage: [
    {
      message: string;
      field: string;
    },
  ];
};

type ErrorNotFound = {
  status: 404;
};
