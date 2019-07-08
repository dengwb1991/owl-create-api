const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config.js')
const config = require('../config')

const configuration = merge(base, {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    filename: 'owl-create-api.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    library: 'owl-create-api',
    libraryTarget: 'umd'
  }
})

module.exports = configuration