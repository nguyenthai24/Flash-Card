"use client";

import axios from "axios";
import { IOriginRequest, axiosOAuth } from "~/configs/axiosClient";

import { PATHS } from "~/constants";
import tokenManager from "./tokenManager";
// import { notifyNativeLogout } from './sendPostMessage';
interface IFailedQueue {
  resolve: Promise<any>;
  reject: Promise<any>;
}

// for multiple requests
let isRefreshing = false;
let failedQueue: IFailedQueue[] = [];

const processQueue = (error: Error | null, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const handleRefreshToken = async (originalRequest: IOriginRequest) => {
  if (isRefreshing) {
    return new Promise(function (resolve: any, reject: any) {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = "Bearer " + token;
        }
        // return axiosVihub(originalRequest);
        return axiosOAuth(originalRequest);
      })
      .catch((err) => err);
  }

  originalRequest._retry = true;
  isRefreshing = true;

  return new Promise(function (resolve, reject) {
    const access_token = tokenManager.getAccessToken();
    const refresh_token = tokenManager.getRefreshToken();

    if (!refresh_token || !access_token) return reject();

    axios
      .post(
        `${process.env.NEXT_PUBLIC_OAUTH_URL}/v1/oauth/refresh-token`,
        undefined,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
            refresh_token,
          },
        },
      )
      .then(({ data }) => {
        //Trường hợp refresh token hết hạn đẩy về trang đăng nhập
        if (!data?.data) throw data;

        tokenManager.setAccessToken(data.data.access_token);
        tokenManager.setRefreshToken(data.data.refresh_token);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] =
            "Bearer " + data.data.access_token;
        }

        processQueue(null, data.data.access_token);
        resolve(axiosOAuth(originalRequest));
      })
      .catch((err) => {
        tokenManager.removeAccessToken();
        tokenManager.removeRefreshToken();

        //  gọi SDK

        // const query = stringtifyQuery({ p: window.location.href });
        // window.location.href = `${PATHS.LOGIN}?${query}`;
        window.location.href = `${PATHS.HOME}`;

        processQueue(err, null);
        reject(err);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
};
