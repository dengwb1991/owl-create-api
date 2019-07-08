const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vueLoaderConfig = require('./vue-loader.config')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'create-api': path.resolve(__dirname, '../src/index.js')
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.(css|less)$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] }
    ]
  }
}