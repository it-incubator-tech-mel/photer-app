export type PostType = {
  id: number;
  description: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
};

export type PostsResponse = {
  items: PostType[];
  page: number;
  pageSize: number;
  pagesCount: number;
  totalCount: number;
};

// Тип для универсальных ошибок API
export type ErrorResponse = {
  error:
    | ErrorIncorrectValue
    | ErrorServerError
    | ErrorNotFound
    | ErrorNotOwner
    | ErrorUnauthorized;
};

type ErrorIncorrectValue = {
  status: 400;
  errorsMessage: Array<{
    message: string;
    field: string;
  }>;
};

type ErrorUnauthorized = {
  status: 401;
};

type ErrorNotOwner = {
  status: 403;
};

type ErrorNotFound = {
  status: 404;
};

type ErrorServerError = {
  status: 500;
  data: {
    message: string;
  };
};
