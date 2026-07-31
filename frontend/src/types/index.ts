import { UseQueryOptions } from '@tanstack/react-query';

export * from './response.type';

// Dùng cho các page trong app router
export interface IBaseCategory {
  name: string;
  code: string;
}

// Dùng cho các page trong app router
export interface IPageProps<P = any, S = any> {
  params: P;
  searchParams: S;
}

// Dùng cho react query
export interface IQueryParams<TParams = any, TOptions = UseQueryOptions<any, any, any>> {
  options?: TOptions;
  params?: TParams;
}

// Dùng cho fetch trên server
export interface IFetchParams<T = any> {
  params?: T;
  excludeId?: T;
  options?: RequestInit & {
    enable?: boolean;
    auth?: boolean;
  };
}

export interface IIconProps {
  size?: string | number;
  color?: string;
}

export interface IBaseFilter {
  pageSize: number;
  pageIndex: number;
  sortBy?: string;
  orderBy?: 1 | -1;
}

export interface IBaseFilterV2 {
  limit: number;
  page: number;
  filter?: object;
  sort?: object;
}
