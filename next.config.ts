import { type NextConfig } from 'next';

const config: NextConfig = {
  output: 'standalone',
  env: {
    PORT: '3001',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false, // @todo не забыть  отключить
};

export default config;
