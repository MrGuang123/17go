const chalk = require('chalk')

const inquirer = require('inquirer')

module.exports = {
  baseQuestions: () => {
    const questions = [
      {
        type: 'input',
        name: 'projectName',
        message: '项目名称',
        validate: val => {
          return val.length > 0 || chalk.red('必须填写名称')
        }
      },
      {
        type: 'input',
        name: 'description',
        message: '项目描述'
      },
      {
        type: 'list',
        name: 'tplName',
        message: '模板类型',
        choices: ['empty', 'vue']
        // choices: [{
        //   name: 'empty',
        //   value: 0
        // }, {
        //   name: 'vue',
        //   value: 1
        // }]
      },
      // {
      //   when: function (allAnswers) {
      //     console.log(x)
      //   },
      //   type: 'input',
      //   name: 'haha',
      //   message: 'test'
      // }
    ]

    return inquirer.prompt(questions)
  }
}