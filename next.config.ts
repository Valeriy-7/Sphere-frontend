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

  // Добавляем перенаправление для запросов к API и WebSocket
  async rewrites() {
    return [
      // WebSocket перенаправление
      {
        source: '/socket.io/:path*',
        destination: 'http://localhost:3001/socket.io/:path*',
      },
      // API перенаправления
      {
        source: '/messages/:path*',
        destination: 'http://localhost:3001/messages/:path*',
      },
      {
        source: '/chats/:path*',
        destination: 'http://localhost:3001/chats/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

export default config;
