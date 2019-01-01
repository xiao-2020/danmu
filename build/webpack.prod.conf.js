const path = require('path')
const webpackBaseConf = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = merge(webpackBaseConf, {
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
      favicon: path.resolve(__dirname, '../src/assets/danmu.ico'), // 添加icon 图标
      minify: { // 控制缩小输出的配置  减小输出的文件
        collapseWhitespace: true, // 去除文档中的空格
        removeComments: true,
        removeRedundantAttributes: true, // 匹配属性为 默认值时删除属性
        removeScriptTypeAttributes: true, // 删除 script 标签上的 默认的 type="text/javascript"   其他的不变
        removeStyleLinkTypeAttributes: true, // 删除 style 标签上的 默认的 type="text/css"   其他的不变
        removeAttributeQuotes: true, // 尽可能的去掉属性周围的引号
      },
    }),
    // 压缩丑化js文件

  ],
});
module.exports = webpackConfig