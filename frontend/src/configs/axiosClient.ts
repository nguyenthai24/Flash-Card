'use client';

import { notifications } from '@mantine/notifications';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { theme } from '~/constants';
import { EAPI_STATUS_CODE, EAPI_STATUS_CODE_V2 } from '~/types/enums';
import handleLogout from '~/utils/handleLogout';
import { handleRefreshToken } from '~/utils/refreshToken';
import tokenManager from '~/utils/tokenManager';

// Lưu lại mã lỗi, với mỗi mã lỗi chỉ hiển thị 1 thông báo tại 1 thời điểm
const cachingErrorCodes: number[] = [];

//Những mã lỗi không hiển thị thông báo
const SPECIAL_API_ERROR_CODE = [EAPI_STATUS_CODE.OTP_REQUIRED, EAPI_STATUS_CODE.PASSWORD_REQUIRED];

export interface IOriginRequest extends AxiosRequestConfig {
  _retry: boolean;
}

const handleRequestSuccess = (config: AxiosRequestConfig): AxiosRequestConfig => {
  let access_token = tokenManager.getAccessToken();
  // const params = new URLSearchParams(window.location.search);
  // const isSDK = params.get('platform');

  // if (!access_token && isSDK === 'SDK') {
  //   const tokenFromPath = params.get('accessToken');

  //   if (tokenFromPath) {
  //     access_token = tokenFromPath;
  //   }
  // }

  if (!config.headers) return config;

  const urlWhitelist = [
    process.env.NEXT_PUBLIC_VIHUB_API_URL,
    process.env.NEXT_PUBLIC_OAUTH_URL,
    process.env.NEXT_PUBLIC_CRM_API_URL,
  ];

  // 🔹 Chỉ thêm token cho API nội bộ hoặc OAuth server (nếu cần)
  if (access_token && config.baseURL && urlWhitelist.includes(config.baseURL)) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }

  return config;
};

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const handleResponseSuccess = (response: AxiosResponse) => {
  const originalRequest = response.config as IOriginRequest;
  const accessToken = tokenManager.getAccessToken();
  const error_code = response?.data?.error_code || response?.data?.errorCode;

  const code = response?.data?.code; // Service vinews, vicrm
  const hasCode = typeof code === 'number';

  if (SPECIAL_API_ERROR_CODE.includes(error_code)) {
    throw response.data;
  }

  if (accessToken && error_code === EAPI_STATUS_CODE.ACCOUNT_LOCKED) {
    handleLogout();
    throw response.data;
  }

  //Xử lý refresh token
  if ((error_code || code) === EAPI_STATUS_CODE.UNAUTHORIZATION && !originalRequest._retry) {
    return handleRefreshToken(originalRequest);
  }

  // Hiển thị thông báo lỗi service vinews, vicrm
  if (hasCode && code !== EAPI_STATUS_CODE_V2.SUCCESS) {
    const errorMessage = response?.data?.message || 'Đã có lỗi xảy ra!';
    notifications.show({
      title: errorMessage,
      message: '',
      color: theme.colors.RED,
    });
    throw response.data;
  }

  //Hiển thị thông báo lỗi
  if (error_code !== EAPI_STATUS_CODE.SUCCESS && response?.data?.status === false) {
    const errorMessage = response?.data?.error_message || 'Đã có lỗi xảy ra!';
    const hasErrorCode = cachingErrorCodes.includes(error_code);

    const handleClose = () => {
      // Xóa caching error code
      const index = cachingErrorCodes.findIndex((code) => code === error_code);
      cachingErrorCodes.splice(index, 1);
    };

    // Kiểm tra error code trong cache
    if (!hasErrorCode) {
      //Caching lại error code
      cachingErrorCodes.push(error_code);

      // Hiển thị thông báo mới
      notifications.show({
        id: error_code,
        title: errorMessage,
        message: '',
        color: theme.colors.RED,
        onClose: handleClose,
      });
    }

    // Cập nhật lại thông báo thay vì hiển thị lần nữa với cùng error code
    else {
      notifications.update({
        id: error_code,
        title: errorMessage,
        message: '',
        color: theme.colors.RED,
        onClose: handleClose,
      });
    }

    // Trường hợp tài khoản bị banned xóa token và tải lại trang
    if (error_code === EAPI_STATUS_CODE.ACCOUNT_BANNED && originalRequest.headers?.Authorization) {
      tokenManager.removeAccessToken();
      tokenManager.removeRefreshToken();
      window.location.reload();
    }

    throw response.data;
  }

  //Trả thẳng về data trong trường hợp là phương thức là GET
  if (response.config.method === 'get') return response.data.data;
  return response.data;
};

const handleResponseError = async (error: any) => {
  console.log('Request error: ', error);

  //show message error
  if (error?.name === 'AxiosError') {
    notifications.show({
      title: 'Đã có lỗi xảy ra!',
      message: '',
      color: theme.colors.RED,
    });
  }

  return Promise.reject(error.response);
};

const getAxiosInstance = (serverUrl: string) => {
  const axiosInstance = axios.create({
    baseURL: serverUrl,
    headers: {
      'Content-Type': 'application/json',
      'accept-language': 'vi-VN',
    },
  });

  axiosInstance.interceptors.request.use(handleRequestSuccess as any, handleRequestError);
  axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);

  return axiosInstance;
};

export const axiosVihub = getAxiosInstance(process.env.NEXT_PUBLIC_VIHUB_API_URL);
export const axiosCRM = getAxiosInstance(process.env.NEXT_PUBLIC_CRM_API_URL);
export const axiosOAuth = getAxiosInstance(process.env.NEXT_PUBLIC_OAUTH_URL);
