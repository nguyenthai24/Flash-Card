'use client';

import { CookieSetOptions } from 'universal-cookie';
import cookiesClient from '~/configs/cookies';
import { COOKIES_KEYS, LOCALSTORAGE_KEYS } from '~/constants';
import { lcStorage } from './storage';

/**
 * @author thangnv
 * @note Sử dụng localstorage hỗ trợ cho hook useTokenChange
 */
const tokenManager = () => {
  let accessToken: string | undefined = cookiesClient.get(COOKIES_KEYS.ACCESS_TOKEN);
  let refreshToken: string | undefined = cookiesClient.get(COOKIES_KEYS.REFRESH_TOKEN);

  const getAccessToken = () => accessToken;

  const setAccessToken = (token: string, options?: CookieSetOptions): void => {
    accessToken = token;
    cookiesClient.set(COOKIES_KEYS.ACCESS_TOKEN, accessToken, options);
    lcStorage.set(LOCALSTORAGE_KEYS.ACCESS_TOKEN, new Date().getTime());
  };
  const removeAccessToken = (): void => {
    accessToken = undefined;
    cookiesClient.remove(COOKIES_KEYS.ACCESS_TOKEN);
    lcStorage.delete(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
  };

  const getRefreshToken = () => refreshToken;

  const setRefreshToken = (token: string, options?: CookieSetOptions): void => {
    refreshToken = token;
    cookiesClient.set(COOKIES_KEYS.REFRESH_TOKEN, refreshToken, options);
    lcStorage.set(LOCALSTORAGE_KEYS.REFRESH_TOKEN, new Date().getTime());
  };

  const removeRefreshToken = (): void => {
    refreshToken = undefined;
    cookiesClient.remove(COOKIES_KEYS.REFRESH_TOKEN);
    lcStorage.delete(LOCALSTORAGE_KEYS.REFRESH_TOKEN);
  };

  return {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
  };
};

export default tokenManager();
