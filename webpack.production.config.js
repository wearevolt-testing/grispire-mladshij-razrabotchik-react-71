const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/index.js'),
  ],
  resolve: {
    root: [path.resolve(__dirname, 'src')],
    extensions: ['', '.js', '.jsx', '.css'],
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'index.bundle.js',
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2017', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
};
