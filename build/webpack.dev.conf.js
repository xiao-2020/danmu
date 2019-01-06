const path = require('path')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
const copyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const devWebpackConfig = merge(baseWebpackConfig('dev'), {
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning', // 不显示任何信息
    // contentBase: false,  使用 false 代表禁用，  但是 watchContentBase  就不能使用了 ，因为 这个属性要求 contenbase 提供一个路径才行  需要监听 模版文件变化 不写就可以了
    // contentBase: path.resolve(__dirname, '..', 'dist') */,  // 资源的位置   可以指定路径    也可以不写 或禁用     devserver 访问的内存中的文件
    // 一般 禁用此选项后 服务会在当前根目录找 静态资源   用 html生成插件生成一个文件就可以了   然后用 copy 插件将静态资源 copy到打包目录下 就可以了  ， 
    compress: true, // 启动gzip 压缩
    port: 8088, // 端口号
    host: 'localhost', // 如果需要外部服务器访问 指定 0.0.0.0
    open: true, // 是否打开默认浏览器
    hot: true, // 开启模块热替换， 加了这个属性  会默认使用 HotModulesReplacePlugin 插件，   配置里 不需要再指定了
    // hotOnly: true, // 和 hot 的 区别在于在某些模块不支持惹替换的情况下  hot会自动刷新页面， hotOnly 不会，  会在控制台提示热更新失败   一般用hot
    // https: true, // 可以设置 https  默认使用自签名证书， 也可以使用自己提供的    https： { key: '', cert: '', ca: '' }
    // lazy: true, //  是否启用惰性模式， 惰性模式下 只有请求文件的时候才会编译，webpack不会监听任何文件， 使用之后 watchOptions 会失效
    noInfo: true, //  是否隐藏 webpack 打包时的信息  一般 隐藏就可以了  打包信息 不不需要看   错误和 警告一样会显示的
    // openPage: '/index/',  // 当打开浏览器的时候默认导航到某一个页面的
    overlay: {
      errors: true,
      warnings: false,
    }, // 是否吧编辑错误 和警告 以 浏览器全屏的方式 展示出来，  一般  error 需要  warining 不需要
    quiet: true, // 除了启动信息之外的所有信息都不会显示
    disableHostCheck: true, // 允许别的地址访问
    headers: {}, // 在所有  响应 中 添加头部 
    historyApiFallback: { // 用于处于路由使用 h5 history API模式的时候  用于处理刷新 404 请求 的 处理
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.resouceDir, 'index.html')}
      ]
    },
    proxy: config.dev.proxy, // 处理代理
    publicPath: config.dev.publicPath, //指定打包后的文件公共路径 默认 微 /
    // setup(app) { // 自定义一些express中间件
    //   app.get('/', function(req, res) {
    //     res.json({custom: 'json'})
    //   })
    // },
    // useLocalIp: true, // 此选项可以让你的项目 可以用你的本地ip 打开
    watchContentBase: true, //  监听 contenbase属性 目录下的文件， 文件变化 会刷新页面。 默认false   如果 contenBase 为 false 的话 不能用此属性
    // watch: {
      
    // }, //   watch 选项默认开启   监听已构建文件的变化
    watchOptions: {
      // aggregateTimeout: 300, // 指监听到文件变化 到文件重新构建之间 设置延时时间  一般都是处理 多处更改文件 统一构建是才需要  单位 ms
      // poll: 1000,  启用轮询来监听某些可能不会触发 热替换文件的变化，  比如远程网络文件 什么的 单位ms
      // ignored: /node_modules/, // 设置 监听忽略的文件， 一般 用来提高效率  可以排除一下大的文件夹。 可以使用  匹配模式
    },// webpack 使用文件系统监听文件的变化， 在某些情况下 不会触发， 当时用远程网络的文件的时候， 可以使用轮询选项来处理 ： poll： true
  },
  plugins:[
    // 定义变量 以便于在项目源文件中可以取到    根据不同的环境打包不同的配置文件
    new webpack.DefinePlugin({
      'NODE_ENV': '"dev"',  // 当前打包环境
      'CUS_STATIC': '""',  // 根据环境  定义不同的服务端静态资源目录
      'ISPROD': JSON.stringify(false),   // 定义当前环境是否是 生产环境
    }),
    // 生成html 文件
    new htmlWebpackPlugin({
      template: 'index.html',  // 模版html 文件   默认 是 当前 项目主目录   写 index.html  相当于  path.resolve(/, 'index.html)
      filename: 'index.html',
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
    // 自定义的静态资源， copy到打包后的静态资源目录  arg: [pattern], options
    new copyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDir,
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
  ]
})
module.exports = devWebpackConfig