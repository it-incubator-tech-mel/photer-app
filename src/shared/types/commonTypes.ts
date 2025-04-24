export type Error404Type = {
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
};

export const isError404 = (error: any): error is Error404Type => {
  const typedError = error as { data: Error404Type };
  return typedError?.data.statusCode === 404;
};
