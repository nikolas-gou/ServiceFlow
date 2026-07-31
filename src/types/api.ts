export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

export const DEFAULT_PAGINATION: PaginationMeta = {
  currentPage: 1,
  perPage: 20,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

export function cleanQueryParams(params: QueryParams): Record<string, string | number | boolean> {
  const cleanParams: Record<string, string | number | boolean> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      cleanParams[key] = value;
    }
  });
  return cleanParams;
}
