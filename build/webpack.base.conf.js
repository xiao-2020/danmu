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
    // 设置reslove 别名  配置@ 这种别名以后  所有非 js 引用的 资源 都可以用 ~(英文状态富豪) + @ （alias）  来保证解析路径正确
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '..', 'src'),
        '@@': path.resolve(__dirname, '..', 'static'), // 静态资源也可以打包  只是 这里面一般放置大文件 所以直接copy 不打包
      }
    },
    module: {
      rules: [{
          test: /\.jsx?$/,
          // 添加 解析 js代码里面的css   还不知道如何为内敛样式 自动添加前缀
          use: ['babel-loader', 'astroturf/loader'],
          exclude: [path.resolve(__dirname, '../node_modules')]
        },
        {
          test: /\.styl$|\.css$/, // 项目配置使用 stylus 编译器    loader 不仅仅需要使用 stylus loader  还需要 使用 css-loader 和 style-loader
          //  如果需要设置自动前缀， 则 引入 postcss-loader 和 autoprefixer
          use: [
            'style-loader',
            // 'css-loader',
            // 开启css 模块化
            {
              loader: 'css-loader',
              options: { //  https://www.npmjs.com/package/css-loader
                url: true, // 默认为true  解析内部所有的 url 地址饮用 并用 resolve 解析 url(image.png) => require('./image.png')，
                // 也可以用一个函数当作参数  筛选出需要resolve 的 url地址  function （url, resourcePath） {}
                import: true, // 默认是 true  是否开启解析 @import 语法 引入的css  也可以用一个函数作为参数 filter 特定的 url  同 url
                modules: true, // 默认false  是否开启 css 模块化功能  4 个参数 1: true  启用本地作用域 2: false 禁用模块规范 3: 'local' 启用本地范围的CSS（与true值相同） 4: "global" 启用全局范围的CSS
                // 使用false 能提高性能  另外---》 使用local值需要您指定:global类。使用global值需要您指定:local类   具体可参照文档
                camelCase: true, // 默认false   为true的情况下  import  css 文件 引入的json key 值会是  驼峰命名形式
                sourceMap: false, // 默认false   不太懂
                importLoaders: 0, // 默认为0， 设置在 css loader 被应用前 将会先加载的loader数
              }
            },
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
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|webp)(\?.*)?$/,
          loader: 'url-loader', // 使用url loader 需要 file-loader   urlloader 只是 把对应的图片可以打成 base64  file loader 是用来解析图片的
          options: {
            limit: 10000, // 低于限制  生成   base64
            // 需要处理windows兼容性
            name: path.posix.join(config[env].assetsSubDir, 'img/[name].[hash:7].[ext]'), // 生成的文件名  一般就是指文件输出的路径， 就是 指向 打当前环境下指定的打包文件位置下的静态资源目录下的 文件 的路径
            //  outputPath 指定的是打包的位置  但是 输出的路径也要正确  否则访问不到  一般指定的就是 静态资源目录 和 文件的名字（可以另外加上 文件夹名字）
            //  例如  require('path/to/1.png') -> 输出为 ->/ + publicPath +  / + 静态资源目录（static）+ / 指定的文件夹名字（此处是img） / + 文件名字 [name].[hash].[ext]
            // outputPath: path.join(config[env].assetsSubDir, '/img/'), // 指定输出的文件夹名字  因为资源输出的路径名一般会带 ，这里一般不指定  默认就会根据路径打包 （个人理解）
            publicPath: config[env].publicPath, // 包文件中引用文件的路径前缀  一般项目部署的时候会用到 他就是指定  资源目标 相对于当前目录 偏移的 路径名称
          }
        },
      ]
    },
    mode: isProd ? config.production.mode : config.dev.mode,
  }
}