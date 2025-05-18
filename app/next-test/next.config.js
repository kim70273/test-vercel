/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // React 개발 모드에서 에러/경고 더 잘 보여줌
  experimental: {
    appDir: true, // App Router 기능 활성화 (Next.js 13+)
  },
};

module.exports = nextConfig;
