const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const webpackConfig = merge(baseConfig, {
  mode: 'development',
  // use inline sourcemap for karma-sourcemap-loader
  devtool: 'inline-source-map'
})

module.exports = webpackConfig