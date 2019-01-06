const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpackBaseConf = require('./webpack.base.conf')
const copyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

// 在 build 文件里面 有定义 process.env.NODE_ENV  但是在这个页面取不到  很奇怪 所以 用 函数 参数的形式传入
const webpackConfig = env => merge(webpackBaseConf(env), {
  plugins: [
    // 定义变量 以便于在项目源文件中可以取到    根据不同的环境打包不同的配置文件
    new webpack.DefinePlugin({
      'NODE_ENV': '"production"',  // 当前打包环境
      'CUS_STATIC': '""',  // 根据环境  定义不同的服务端静态资源目录
      'ISPROD': JSON.stringify(true),   // 定义当前环境是否是 生产环境
    }),
    // 生成html 文件
    new htmlWebpackPlugin({
      template: 'index.html',  // 模版html 文件   默认 是 当前 项目主目录   写 index.html  相当于  path.resolve(/, 'index.html)
      favicon: path.posix.resolve(__dirname, '../static/ico/danmu.ico'), // 添加icon 图标
      minify: { // 控制缩小输出的配置  减小输出的文件
        collapseWhitespace: true, // 去除文档中的空格
        removeComments: true,
        removeRedundantAttributes: true, // 匹配属性为 默认值时删除属性
        removeScriptTypeAttributes: true, // 删除 script 标签上的 默认的 type="text/javascript"   其他的不变
        removeStyleLinkTypeAttributes: true, // 删除 style 标签上的 默认的 type="text/css"   其他的不变
        removeAttributeQuotes: true, // 尽可能的去掉属性周围的引号
      },
    }),
    // 清理文件夹  指定清除的文件夹  并配置 文件加所在的路径
    new cleanWebpackPlugin([config.production.resouceDir], {
      root: path.resolve(__dirname, '..')
    }),
    // 防止重复 提取公共依赖模块
    // new webpack.optimize.CommonsChunkPlugin({
    //   name:'common'
    // })
    // 压缩丑化js文件

    // 自定义的静态资源， copy到打包后的静态资源目录  arg: [pattern], options
    new copyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.production.assetsSubDir,
      // 在copy之前做一些操作来修改 文本内容   content : 文件流  path  文件路径
      transform: function(content, path) {
        // console.log(content, path)
        return content
      }
    }], {
      // 忽略哪些文件 ----- glob  匹配规则 满足条件的不copy      dot : false   意思就是   允许所有 以.开头的文件 copy
      ignore: [{
        glob: 'ico/*',
        dot: false
      },
      {
        glob: '**/SN*',
      }],
      // 默认false    只复制 修改过的文件     设置为true  就是 意思就是 复制所有的满足条件的文件 不管 有没有修改
      copyUnmodified: false
    }),
  ],
});
module.exports = webpackConfig