export interface PaginatedResponse<U> {
  items: U;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}