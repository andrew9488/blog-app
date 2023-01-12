export const errorHandler = (error: unknown) => {
  return error instanceof Error ? error.message : "Some error";
};
