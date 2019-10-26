
const chalk = require('chalk')
const figlet = require('figlet')
const clui = require('clui')
const download = require('download-git-repo')
const rimraf = require('rimraf')
const fs = require('fs')
const path = require('path')

const { baseQuestions } = require('./inquirerApi')
const { isExists } = require('./fileApi')

let resultObj
const gitRepoMap = {
  vue: 'direct:git@github.com:MrGuang123/webpack-vue-tpl.git#master',
  empty: ''
}

const initModule = {
  init: async function () {
    // 显示个性字符
    console.log(
      chalk.blue(
        figlet.textSync('YTGINIT', { font: 'Ghost' })
      )
    )

    let baseAnswer

    // 询问问题
    try {
      baseAnswer = await baseQuestions()
      // console.log(baseAnswer)
    } catch (e) {
      console.log(chalk.red('获取答案失败'))
      process.exit(1)
    }

    // 整合参数开始生成和下载
    resultObj = Object.assign({}, baseAnswer)
    this.downloadAndGenerate(resultObj)
  },
  downloadAndGenerate: function (param) {
    let gitRepo = gitRepoMap[param.tplName]
    let projectName = param.projectName

    // 如果存在就删除文件夹
    if (isExists(projectName)) rimraf.sync(projectName)

    const loading = new clui.Spinner('正在生成中。。。')
    loading.start()

    download(gitRepo, projectName, { clone: true }, err => {
      loading.stop()
      if (err) {
        return console.log(chalk.red('模板下载失败！'), err)
      }
      this.configProject(param)
      console.log(chalk.green('加载配置完成!'))
      console.log('')
    })
  },
  configProject: function (param) {
    let packageJson = fs.readFileSync(path.resolve(param.projectName, 'package.json'))
    packageJson = JSON.parse(packageJson)
    packageJson.name = param.projectName
    packageJson.author = ""
    const newContent = JSON.stringify(packageJson, null, 4)
    fs.writeFileSync(path.resolve(param.projectName, 'package.json'), newContent, 'utf-8')
  }
}

module.exports = initModule