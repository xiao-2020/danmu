const path = require('path')


const dir = process.argv[2] || 'dist'

module.exports = {
  dev: {
    output: {
      // 制定生成的文件名称，  [name] 代表 入口对象制定的key值
      filename: '[name].js',
    },
    mode: 'development',
    // 定义 devServer 的部分参数
    host: 'localhost',
    port: 8088,
    proxy: {},
    devtool: 'none',
    publicPath: '/',
    assetsSubDir: 'static',
    // 设置打包后的资源目录路径
    resouceDir: path.posix.resolve(__dirname, '..', dir),
  },
  production: {
    output: {
      // 制定生成的文件名称，  [name] 代表 入口对象制定的key值
      filename: '[name].[chunkhash].js',
    },
    // 设置打包后的资源目录路径
    resouceDir: path.posix.resolve(__dirname, '..', dir),
    mode: 'production',
    devtool: 'none',
    publicPath: '/', //资源路径
    assetsSubDir: 'static',
    productionGzip: true, //是否压缩启用
    productionGzipExtensions: ['js', 'css'], //压缩启用-压缩的内容
    deleteOriginalAssets: false, //压缩启用-删除压缩的源文件
  }
}