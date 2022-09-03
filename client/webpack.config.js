const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    //plugins array for PWA
    plugins: [
      // Adding HtmlWebpackPlugin simplifies creation of HTML files to serve webpack bundles
     //making sure this appears before WebpackPwaManifest as we are using inject in our configuration
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      // Adding InjectManifest for compiling a service worker file provided via swSrc
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      //WebpackPwaManifest pluggin  generates a 'manifest.json' for your Progressive Web Application
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'memnote',
        short_name: 'JATE',
        description: 'Just Another Text Editor!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [32, 48, 64, 96, 128, 192],
            destination: path.join('assets', 'icons'),
          },
        ],
      })
      
    ],

    module: {
      rules: [
                {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            //babel-loader allows our webpack to process different types of files and then convert them into valid modules
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        }
      ],
    },
  };
};
