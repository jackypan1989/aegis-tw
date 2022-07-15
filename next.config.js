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
    config.module.rules.push({
      test: /\.gql$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
    })
    return config
  }
}

module.exports = nextConfig
