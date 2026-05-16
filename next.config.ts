import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  typedRoutes: true,
  images: {
    unoptimized: true
  },
  turbopack: {
    root: __dirname
  }
};

export default nextConfig;
