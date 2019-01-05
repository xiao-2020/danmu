const ora = require('ora') // 用来在命令行实现一些 loading 特殊的样式和效果
const chalk = require('chalk') // 用来显示在终端不同的颜色文本
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')
process.env.NODE_ENV = 'production'
const spinner = ora({
  text: '正在打包项目。。。',
  spinner: "bouncingBall",  // loading 特效  --->   https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json
  interval: 50
}).start();

webpack(webpackConfig('production'), async (err, stats) => {
  if(err) throw err;
  // 输出打包过程信息
  process.stdout.write(stats.toString({
    modules: false, //去掉内置模块信息
    children: false, //去掉子模块信息
  }) + '\n\n');
  // 假如
  if(stats.hasErrors()) {
    console.log(chalk.red('打包失败。\n'));
    process.exit(1);
  }
  await new Promise(resolve => setTimeout(resolve, 1000));
  spinner.succeed('打包完成');
})
