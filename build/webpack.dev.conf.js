const path = require('path')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: config.dev.devtool,
  devServer: {
    contentBase: './dist'
  },
  plugins:[]
})
console.log(devWebpackConfig) 
module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})