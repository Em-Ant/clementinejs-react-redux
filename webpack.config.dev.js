const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    main: ['webpack-hot-middleware/client', path.join(__dirname, 'client', 'src', 'index.jsx')],
  },
  output: {
    path: path.join(__dirname, 'public', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  mode: 'development',
  target: 'web',
  optimization: { chunkIds: 'total-size', moduleIds: 'size' },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: ['.', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }, {
        test: /\.json$/,
        loader: 'json',
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]' },
      }],
  },
};
