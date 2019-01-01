
const path = require('path')
const config = require('./config')

const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  // 项目的基础路径 一般指定当前工作目录
  context: path.resolve(__dirname, '../'),
  // 指定打包文件的入口文件
  entry: {
    app: ['babel-polyfill', './src/main.js'] 
  },
  // 指定资源的输出
  output: {
    // 输入到那个位置
    path: config.production.resouceDir,
    // 制定生成的文件名称，  [name] 代表 入口对象制定的key值
    filename: '[name].js',
    publicPath: isProd ? config.production.publicPath : config.dev.publicPath,
  },
  devtool: isProd ? config.production.devtools : config.dev.devtools,
  module: {
    rules: []
  },
  mode: isProd ? config.production.mode : config.dev.mode,
}