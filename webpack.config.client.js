var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname,'client','src','index.jsx'),
    vendors: [
      'react', 'redux', 'react-redux', 'react-router',
      'react-dom', 'redux-thunk'
    ]
  },
  output: {
    path: path.join( __dirname,'dist', 'public','static'),
    filename: 'bundle.js',
    publicPath: '/static/'},
  target: "web",
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass")
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  }
};
