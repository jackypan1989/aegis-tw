/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const nextMDX = require('@next/mdx')

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react"
  },
})

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
  },
  i18n: {
		locales: ['tw', 'en'],
		defaultLocale: 'tw'
	}
}

module.exports = withMDX(nextConfig)


