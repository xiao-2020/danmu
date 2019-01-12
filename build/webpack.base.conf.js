
const path = require('path')
const config = require('./config')
module.exports = env => {
  const isProd = env === 'production'
  return {
    // 项目的基础路径 一般指定当前工作目录
    context: path.posix.resolve(__dirname, '../'),
    // 指定打包文件的入口文件
    entry: {
      app: ['babel-polyfill', './src/main.js'] 
    },
    // 指定资源的输出
    output: {
      // 输入到那个位置
      path: config.production.resouceDir,
      // 制定生成的文件名称，  [name] 代表 入口对象制定的key值
      filename: path.posix.join(config[env].assetsSubDir, 'js/[name].js'),
      publicPath: isProd ? config.production.publicPath : config.dev.publicPath,
    },
    devtool: isProd ? config.production.devtools : config.dev.devtools,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [path.resolve(__dirname, '../node_modules')]
        },
        {
          test: /\.styl$|\.css$/, // 项目配置使用 stylus 编译器    loader 不仅仅需要使用 stylus loader  还需要 使用 css-loader 和 style-loader
          //  如果需要设置自动前缀， 则 引入 postcss-loader 和 autoprefixer   
          use: [
            'style-loader', 
            'css-loader', 
            {
              loader: 'postcss-loader',
              // 参数一般 在根目录下建 postcss.config.js
              // options: {
              //   // 指定postcss 路径  默认 会 一级一级目录向上找   postcss.config.js 文件， 找到就会应用， 所以可以设置不同文件不同的解析配置。  推荐在根目录下 创建  config文件
              //   config: {
              //     path: '',
              //   }
              // }
            },
            'stylus-loader',
          ]
        }
      ]
    },
    mode: isProd ? config.production.mode : config.dev.mode,
  }
}