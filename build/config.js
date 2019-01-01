const path = require('path')


const dir = process.argv[2] || 'dist'

module.exports = {
  dev: {
    mode: 'development',
    // 定义 devServer 的部分参数
    proxy: {},
    devtool: 'none',
    publicPath: '/',
  },
  production: {
    // 设置打包后的资源目录路径
    resouceDir: path.resolve(__dirname, '..',dir),
    mode: 'production',
    devtool: 'none',
    publicPath: '/',
  }
}