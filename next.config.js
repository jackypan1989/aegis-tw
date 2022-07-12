/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/post',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true }
    return config
  }
}

module.exports = nextConfig
