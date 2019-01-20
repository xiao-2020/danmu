const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpackBaseConf = require('./webpack.base.conf')
const copyWebpackPlugin = require('copy-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const config = require('./config')

//TODO 在 build 文件里面 有定义 process.env.NODE_ENV  但是在这个页面取不到  很奇怪 所以 用 函数 参数的形式传入
const webpackConfig = env => merge(webpackBaseConf(env), {
  plugins: [
    //压缩Gzip,减少文件体积
    new CompressionWebpackPlugin({
      filename: '[file].gz[query]', //生成的目标文件名，可以是函数  //TODO 有待考证 具体的 path  file  query之间具体的关系 如何吧文件打包到别的目录
      /** //! //TODO 待验证。。。。。！！！！！
       * filename 函数 返回生成的目录
       * @param {Object} info   --> info 三个属性  1 。 file  源文件名称    2. path  元静态资源目录  3.  query  源 资源查询参数
       * @returns String  路径 和文件名
       */
      // filename(info) {
      //   let path = path.resolve('..', info.path),
      //     name = info.file,
      //     query = info.query
      //   console.log(`${path}${name}.gz${query}`)
      //   return  `${name}.gz${query}`
      // },
      algorithm: 'gzip', //压缩算法  默认值 是 gzip 。  参数可以是 字符串 可以是一个函数  算法取至于  zlib库
                        // 参数可以是函数   
                        /**
                         * input 输入  compressionOptions 压缩参数   callback 毁掉函数
                         * algorithm (input, compressionOptions, callback) {
                         ** 这里可以做一些别的处理 //TODO ...
                         *   return compressionFunction(input, compressionOptions, callback);
                         * }
                         * ///! 其中 compressionOptions 参数是一个对象  默认值 是 { level : 9 },, 如果algorithm 使用默认函数， 则默认值为 {} 
                         * /// 具体的值可以在  zlib 里面找到更多 https://nodejs.org/api/zlib.html
                         */
      // include:'', // 要包含的文件
      // exclude: '', //要排除的文件
      cache: path.posix.join(__dirname, '..', 'cache'), //TODO // 重点是这个缓存有什么用？？？？ 需要后期搞清楚啊 
      // cache: false, //是否启用文件缓存。可以设置为缓存目录string类型  默认缓存的路径地址是：node_modules/.cache/compression-webpack-plugin. 
                    // 默认 false 不缓存 
      test: [
        new RegExp('\\.js$'),
        // new RegExp('\\.css$'), //? 此项目现在目前应该用不着 css 所以看情况打开
      ], //  匹配需要压缩的文件   参数是  字符串 或 正则表达式  或者 字符串 数组  正则表达式 数组  默认值 undifined
      //  也可以用 include  和 exclude 来选定想要压缩的文件 这两个选项参数 同 test 。  
      compressionOptions: {
        level: 1
      }, //压缩选项
      threshold: 10240, //最小开启压缩大小，单位为字节  默认值 为0 
      minRatio: 0.8, //开启压缩的最低压缩比，只有优于这个压缩比比的才被压缩
      deleteOriginalAssets: config.production.deleteOriginalAssets //是否删除源文件
    }),
    // 定义变量 以便于在项目源文件中可以取到    根据不同的环境打包不同的配置文件
    new webpack.DefinePlugin({
      'NODE_ENV': '"production"', // 当前打包环境
      'CUS_STATIC': '""', // 根据环境  定义不同的服务端静态资源目录
      'ISPROD': JSON.stringify(true), // 定义当前环境是否是 生产环境
    }),
    // 生成html 文件
    new htmlWebpackPlugin({
      template: 'index.html', // 模版html 文件   默认 是 当前 项目主目录   写 index.html  相当于  path.resolve(/, 'index.html)
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
      transform: function (content, path) {
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
        }
      ],
      // 默认false    只复制 修改过的文件     设置为true  就是 意思就是 复制所有的满足条件的文件 不管 有没有修改
      copyUnmodified: false
    }),
  ],
});
module.exports = webpackConfig