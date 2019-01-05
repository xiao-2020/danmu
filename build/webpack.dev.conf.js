const path = require('path')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const devWebpackConfig = merge(baseWebpackConfig('dev'), {
  devtool: config.dev.devtool,
  devServer: {
    contentBase: './dist'
  },
  plugins:[]
})
module.exports = devWebpackConfig