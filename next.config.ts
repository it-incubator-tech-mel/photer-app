import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  images: {
    domains: ['storage.yandexcloud.net'], // 👈 разрешаем подгрузку изображений с этого домена
  },
};

export default nextConfig;
