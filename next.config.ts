/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  images: {
    domains: ['storage.yandexcloud.net'],
  },
};

export default nextConfig;
