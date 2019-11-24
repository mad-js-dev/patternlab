const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin');
const sass = require('node-sass');
const magicImporter  = require('node-sass-magic-importer');

const path = require('path');

module.exports = {
  entry: {
  	'object-layer': ['./source/css/object-layer.scss']
  },
  output: {
    path:  path.resolve(__dirname, './source/css/'),
    filename: "[name].min.css",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hot: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
              sassOptions: {
                importer: magicImporter ()
              }
            }
          }
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
};