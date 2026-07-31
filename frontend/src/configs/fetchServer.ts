'use server';

import { cookies, headers } from 'next/headers';
import { COOKIES_KEYS } from '~/constants';
import { IFetchParams } from '~/types';
import { EAPI_STATUS_CODE, EAPI_STATUS_CODE_V2 } from '~/types/enums';

export default async function fetchServer<T = any>(
  input: string | URL | globalThis.Request,
  init?: IFetchParams['options']
): Promise<T | undefined> {
  if (init?.enable === false) return;

  init = init || {};
  init.headers = {
    'Content-Type': 'application/json',
    ...(init.headers as any),
  };

  // Nếu auth truyền thêm token
  if (init?.auth) {
    const userAgent = headers().get('User-Agent');
    const accessToken = cookies().get(COOKIES_KEYS.ACCESS_TOKEN)?.value;

    (init.headers as any)['User-Agent'] = userAgent; // REQUIRED

    if (accessToken) {
      (init.headers as any)['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  const response = await fetch(input, { cache: 'no-cache', ...init });

  if (!response || !response.ok) return;

  const data = await response.json();
  // Server vihub, vipay
  if (
    data.error_code !== undefined &&
    data.error_code !== EAPI_STATUS_CODE.SUCCESS &&
    data?.status === false
  )
    return;

  // Server vinews, vicrm, ...
  if (data?.code !== EAPI_STATUS_CODE_V2.SUCCESS && data?.error) return;

  return data?.data;
}
