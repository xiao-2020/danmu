const path = require('path')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const devWebpackConfig = merge(baseWebpackConfig('dev'), {
  devtool: config.dev.devtool,
  devServer: {
    contentBase: '../dist',
    compress: true, // 启动gzip 压缩
    port: 8088,
    host: 'localhost',
    open: true,
    disableHostCheck: true,
  },
  plugins:[]
})
module.exports = devWebpackConfig