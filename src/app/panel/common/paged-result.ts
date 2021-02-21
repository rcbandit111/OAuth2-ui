export interface IPagedResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}
