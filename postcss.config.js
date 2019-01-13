
// 导出postcss 默认的配置对象
module.exports = {
  // 使用哪些插件
  // 自动添加前缀的插件  后面使用  {}  代表使用默认配置
  //  "autoprefixer": {},  具体插件要控制的浏览器规则 可以在根目录下 创建一个 .browserlistrc文件 也可以在package。json 里面 加一个  browerslisst 指定
  // plugins: {
  //   "autoprefixer": {},
  // },
  plugins: [
    require('autoprefixer')
  ]
}