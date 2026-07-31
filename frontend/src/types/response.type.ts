export interface IPagination<T> {
  pageIndex: number;
  pageSize: number;
  records: T[];
  totalPages: number;
  totalRecords: number;
}

export interface IPaginationV2<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
}

export interface IPaginationV3<T> {
  data: T[];
  totalPages: number;
  total: number;
}

export interface IResponse<T = any> {
  status: boolean;
  error_code: number;
  error_message: string;
  data: T;
}
