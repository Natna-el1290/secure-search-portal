/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Only apply CSP in production, or include 'unsafe-eval' in dev
    const isDev = process.env.NODE_ENV === 'development';
    const cspValue = isDev
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
      : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspValue,
          },
        ],
      },
    ];
  },
};

export default nextConfig;