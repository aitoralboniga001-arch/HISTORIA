import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.CAPACITOR_EXPORT === '1' ? 'export' : undefined,
  typedRoutes: true,
  images: {
    unoptimized: true
  },
  turbopack: {
    root: __dirname
  }
};

export default nextConfig;
