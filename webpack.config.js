var Clean = require('clean-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var config = {
  context: path.join(__dirname, '/www'),
  //devtool: 'source-map',

  entry: {
    common: [
      //'angular',
      //'angular-ui-router',
      'bootstrap',
      './assets/libs/bootstrap/css/bootstrap.css',
      //'./assets/libs/angular-nvd3/lib/d3.min.js',
      //'./assets/libs/angular-nvd3/lib/nv.d3.js',
      //'./assets/libs/angular-nvd3/dist/angular-nvd3.js',
      //'./assets/libs/angular-nvd3/lib/nv.d3.css',
      //'oclazyload',
      './index.js'
    ],
    libs: [
      'angular',
      'angular-ui-router'
    ]
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
    //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new webpack.optimize.CommonsChunkPlugin('libs', 'libs.js'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
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
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff",
        exclude: /node_modules/
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff2",
        exclude: /node_modules/
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream",
        exclude: /node_modules/
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file",
        exclude: /node_modules/
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml",
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
    fs.writeFileSync(dir + '/d3.min.js', fs.readFileSync('www/assets/libs/angular-nvd3/lib/d3.min.js'));
    fs.writeFileSync(dir + '/nv.d3.js', fs.readFileSync('www/assets/libs/angular-nvd3/lib/nv.d3.js'));
    fs.writeFileSync(dir + '/angular-nvd3.js', fs.readFileSync('www/assets/libs/angular-nvd3/dist/angular-nvd3.min.js'));
    fs.writeFileSync(dir + '/nv.d3.css', fs.readFileSync('www/assets/libs/angular-nvd3/lib/nv.d3.css'));
  });
});

module.exports = config;
