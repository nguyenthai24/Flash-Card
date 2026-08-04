import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  experimental: {
    // typedRoutes: true,
  },
  generateEtags: false,
  poweredByHeader: false,
  cleanDistDir: true,
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  // rewrites,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
