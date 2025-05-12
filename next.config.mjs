/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Для GitHub Pages нужно отключить оптимизацию изображений
  },
  // Если ваш сайт будет размещен в подкаталоге, например, username.github.io/paint-ecommerce
  // раскомментируйте следующую строку и замените 'paint-ecommerce' на имя вашего репозитория
  // basePath: '/paint-ecommerce',
};

export default nextConfig;
