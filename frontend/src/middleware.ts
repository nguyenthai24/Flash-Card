import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  COOKIES_KEYS,
  HEADER_DOMAIN_KEY,
  HEADER_IS_SDK_KEY,
  HEADER_URL_KEY,
  PATHS,
} from './constants';

const protectedRoutes = ['/study-set'];
const guestOnlyRoutes = [PATHS.LOGIN, PATHS.REGISTER];

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

  const cookieToken = request.cookies.get(COOKIES_KEYS.ACCESS_TOKEN)?.value;
  const isGuestOnlyRoute = guestOnlyRoutes.some((route) => pathname === route);
  if (cookieToken && isGuestOnlyRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute) {
    if (!cookieToken) {
      const loginUrl = new URL(PATHS.LOGIN, request.url);
      loginUrl.searchParams.set('redirect', `${pathname}${request.nextUrl.search}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.*\\.png$).*)'],
  // matcher: ['/((?!api|_next|favicon\\.\\w+$|manifest\\.json|robots\\.txt|sitemap\\.xml).*)'],
};
