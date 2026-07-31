export * as COOKIES_KEYS from './cookiesKeys';
export * as LOCALSTORAGE_KEYS from './localStorageKeys';
export * as MESSAGES from './messages';
export * as PATHS from './paths';
export * as PATTERNS from './patterns';
export * as REDIRECT_TO_LOGIN from './redirectToLogin';
export * as ACCOUNT_SIDEBAR_NAME from './sidebarName';

import * as BREAKPOINTS from '~/theme/breakpoints';
import * as COLORS from '~/theme/colors';
import * as SHADOWS from '~/theme/shadows';
import * as SIZES from '~/theme/sizes';

export const theme = {
  colors: COLORS,
  sizes: SIZES,
  shadows: SHADOWS,
  breakpoints: BREAKPOINTS,
};

export const isClient = typeof window !== 'undefined';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'HH:mm DD/MM/YYYY ';
export const DEFAULT_PAGESIZE = 20;
export const HEADER_URL_KEY = 'x-url'; // Lấy url qua header trên server
export const HEADER_DOMAIN_KEY = 'x-domain'; // Lấy domain qua header trên server
export const HEADER_LANGUAGE_KEY = 'x-lang';
export const HEADER_IS_SDK_KEY = 'x-is-sdk';
export const IMAGE_MAX_SIZE = 10 * 1024 * 1024; //Không quá 10MB
export const TICKET_LIMIT_FILE_UPLOAD = 10; //Giới hạn số lượng file đính kèm khi tạo ticket
