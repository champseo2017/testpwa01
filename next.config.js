const withCSS = require('@zeit/next-css');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const withOffline = require('next-offline')

module.exports = withOffline(withCSS({

  webpack(config, { isServer, buildId, dev }) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    if (isServer) {
      config.module.rules.find(({ test }) => test.test('style.css')).use.push({
        loader: 'css-purify-webpack-loader',
        options: {
          includes: ['./pages/*.js', './components/*.js'],
        },
      });
    }

    const workboxOpts = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/static/commons/*'],
      globDirectory: {
        '.next': '/_next',
      },
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: '/user',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    };


    if (isServer) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          ...workboxOpts,
        }),
        new WebpackPwaManifest({
          filename: 'static/manifest.json',
          name: 'Next PWA',
          short_name: 'Next-PWA',
          description: 'A Movie browsing PWA using Next.js and Google Workbox',
          background_color: '#ffffff',
          theme_color: '#5755d9',
          display: 'standalone',
          orientation: 'portrait',
          fingerprints: false,
          inject: false,
          start_url: '/',
          ios: {
            'apple-mobile-web-app-title': 'Next-PWA',
            'apple-mobile-web-app-status-bar-style': '#5755d9',
          },
          icons: [
            {
              src: path.resolve('static/favicon.ico'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: '/static',
            },
          ],
          includeDirectory: true,
          publicPath: '..',
        })
      );
    }

    return config;
  },
}));