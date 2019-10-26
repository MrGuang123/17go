#!/usr/bin/env node

// chalk：彩笔 clear：清空命令行 clui：绘制表格、仪表盘、加载指示器等 figlet：生成字符图案
// inquirer：创建交互式命令行 minimist：解析参数 configstore：加载和保存配置
const chalk = require('chalk')
const figlet = require('figlet')
const clear = require('clear')
const program = require('commander')
const download = require('download-git-repo')

const pkg = require('./package.json')
const initModule = require('./lib/init')
// const { init } = require('./lib/init')

// clear()

program.version(pkg.version)
program.usage('init')

program.on('--help', function () {
  console.log('example:')
  console.log('')
  console.log(chalk.gray('# 在当前目录初始化一个项目'))
  console.log(chalk.green('$ ytginit init'))
  console.log('')
});

program.on('command:*', function (data) {
  // console.error('参数错误', data)
  if (data && data[0] === 'init') {
    initModule.init()
  } else {
    program.help()
    process.exit(0)
  }
})

program.parse(process.argv);
// console.log('######', program.args[0])
if (program.args.length < 1) {
  program.help()
}




