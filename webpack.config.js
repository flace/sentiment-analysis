var Clean = require('clean-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var config = {
  context: path.join(__dirname, '/www'),
  devtool: 'source-map',

  entry: {
    common: [
      'angular',
      'angular-ui-router',
      //'oclazyload',
      './index.js'
    ]
    //news: './components/news'
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      ON_DEV: process.env.NODE_ENV === 'development',
      ON_PROD: process.env.NODE_ENV === 'production'
    }),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
        exclude: /node_modules/
      }
    ]
  }
};

var dir = 'public';
config.plugins.push(new Clean([dir]));
config.plugins.push(function () {
  this.plugin('done', function () {
    fs.writeFileSync(dir + '/index.html', fs.readFileSync('www/index.html'));
  });
});

module.exports = config;
