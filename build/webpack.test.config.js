var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config.js')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  devtool: '#inline-source-map'
})

module.exports = webpackConfig