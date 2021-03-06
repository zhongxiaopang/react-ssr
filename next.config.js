const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { ANALYZE } = process.env
const dev = process.env.NODE_ENV !== 'production'

// 开发模式下的页面缓存
// SSR页面缓存配置 https://github.com/zeit/next.js/blob/canary/examples/ssr-caching/server.js

const onDemandEntries = {
  // period (in ms) where the server will keep pages in the buffer
  maxInactiveAge: 25 * 1000,
  // number of pages that should be kept simultaneously without being disposed
  pagesBufferLength: 2,
}

module.exports = {
  useFileSystemPublicRoutes: false,
  assetPrefix: !dev ? 'http://public.duduapp.net/finance/static' : '',
  ...(dev && { onDemandEntries }),
  webpack: (config) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 7777,
        openAnalyzer: true,
      }))
    }
    return config
  },
}
