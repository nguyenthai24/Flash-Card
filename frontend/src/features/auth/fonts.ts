import { Baloo_2, Be_Vietnam_Pro } from 'next/font/google';

export const authHeadingFont = Baloo_2({
  weight: ['600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-auth-heading',
});

export const authBodyFont = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-auth-body',
});
