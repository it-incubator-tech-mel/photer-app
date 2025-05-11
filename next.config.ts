// // next.config.ts

// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   experimental: {
//     optimizeCss: false,
//   },
// };

// export default nextConfig;

// // next.config.ts
// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   experimental: {
//     optimizeCss: false,
//   },
//   images: {
//     domains: ['storage.yandexcloud.net'], // 👈 разрешаем подгрузку изображений с этого домена
//   },
// };

// export default nextConfig;

// // next.config.ts
// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   experimental: {
//     optimizeCss: false,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'storage.yandexcloud.net',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  images: {
    unoptimized: true, // ⛔ отключает оптимизацию изображений (временно, для отладки)
    // unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
