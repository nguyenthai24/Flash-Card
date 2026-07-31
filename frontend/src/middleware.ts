import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  COOKIES_KEYS,
  HEADER_DOMAIN_KEY,
  HEADER_IS_SDK_KEY,
  HEADER_URL_KEY,
  PATHS,
} from './constants';
import { EDEVICE_TYPE } from './types/enums';

// Danh sách các đường dẫn bắt đầu bằng các prefix này sẽ yêu cầu login
const protectedRoutes = [PATHS.PLAY_GAME];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isSDK = request.nextUrl.searchParams.get('platform')?.toUpperCase() === 'SDK';
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto');
  const domain = `${protocol}://${host}`;
  const url = domain + request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(HEADER_DOMAIN_KEY, domain);
  requestHeaders.set(HEADER_URL_KEY, url);
  requestHeaders.set(HEADER_IS_SDK_KEY, isSDK ? 'true' : 'false');

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // 2. Kiểm tra quyền truy cập
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute) {
    // 1. Lấy token từ nhiều nguồn: Ưu tiên SearchParams (cho SDK/Lần đầu login) rồi mới đến Cookies
    const accessTokenParam = request.nextUrl.searchParams.get('accessToken');
    // const refreshTokenParam = request.nextUrl.searchParams.get('refreshToken');
    const cookieToken = request.cookies.get(COOKIES_KEYS.ACCESS_TOKEN)?.value;

    const finalToken = accessTokenParam || cookieToken;

    if (!finalToken) {
      const ssoUrl = process.env.NEXT_PUBLIC_SSO_URL;
      const clientId = process.env.NEXT_PUBLIC_SSO_CLIENT_ID;

      // const currentUrl = request.nextUrl.href;

      const loginRedirect = `${ssoUrl}/?client_id=${clientId}&type=${EDEVICE_TYPE.DESKTOP}&scope=${encodeURIComponent('profile,balance')}&state=${encodeURIComponent(url)}`;
      return NextResponse.redirect(new URL(loginRedirect, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.*\\.png$).*)'],
  // matcher: ['/((?!api|_next|favicon\\.\\w+$|manifest\\.json|robots\\.txt|sitemap\\.xml).*)'],
};
