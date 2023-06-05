// 请求 fs-extra 库，用于文件操作
const fse = require('fs-extra');
// 请求 ora 库，用于初始化项目时等待动画
const ora = require('ora');
// 请求 chalk 库
const chalk = require('chalk');
// 请求 log-symbols 库
const symbols = require('log-symbols');
// 请求 inquirer 库，用于控制台交互
const inquirer = require('inquirer');

const path = require('path');

// 请求 download.js 文件，模板不在本地时执行该操作
const addTemplate = require('./download');
// prompt文件
const promptProjectCover = require('./promptModules/projectCover');
const promptProjectSelect = require('./promptModules/projectSelect');
const { projectNpmInstall, projectNpmRun } = require('./promptModules/projectNpmInstall');

const platform = process.platform;

const child_process = require('child_process')

const { spawn } = child_process


// 初始化项目
async function initProject(projectName) {
  try {
    const targetDir = path.join(process.cwd(), projectName);
    if (fse.existsSync(targetDir)) {
      // 项目重名时提醒用户
      inquirer.prompt(promptProjectCover).then((answers) => {
        if (answers.projectCover) {
          createProject(targetDir, true, projectName);
        } else {
          console.log(symbols.error, chalk.red(`项目名称已存在，请重新设置！`));
          process.exit();
        }
      }).catch((error) => {
        console.log(symbols.error, chalk.red(`error：${error}`));
        process.exit();
      });
    } else {

      createProject(targetDir, false, projectName);
    }
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

// 开始创建项目
async function createProject(targetDir, removeDir, projectName) {
  // 执行控制台交互
  inquirer.prompt(promptProjectSelect).then(async (answers) => {
    // 获取选择的模板
    const projectSelect = answers.projectSelect;
    // Spinner 初始设置
    const initSpinner = ora(chalk.cyan('创建目录...'));
    // 开始执行等待动画
    initSpinner.start();
    // 移除已有项目
    if (removeDir) {
      try {
        await fse.remove(targetDir)
      } catch (err) {
        // 如果出错，Spinner 就改变文字信息
        initSpinner.text = chalk.red(`移除原有目录失败： ${err}`);
        // 终止等待动画并显示 X 标志
        initSpinner.fail();
        // 退出进程
        process.exit();
      }
    }
    //判断目录是否存在，不存在则创建
    fse.ensureDir(targetDir);

    // 开始下载模板
    try {
      initSpinner.text = `下载模板...`;
      await addTemplate(targetDir, projectSelect);
    } catch (e) {
      // 如果成功，Spinner 就改变文字信息
      initSpinner.text = chalk.red(e);
      // 终止等待动画并显示 ✔ 标志
      initSpinner.fail();
      // 退出进程
      process.exit();
    }
    // 如果成功，Spinner 就改变文字信息

    initSpinner.text = '初始化项目完成.';
    // 终止等待动画并显示 ✔ 标志
    initSpinner.succeed();
    initSpinner.text = 'cd  ' + projectName;
    // 终止等待动画并显示 ✔ 标志
    initSpinner.succeed();
    initSpinner.text = 'npm install';
    // 终止等待动画并显示 ✔ 标志
    initSpinner.succeed();
    initSpinner.text = 'npm run dev';
    // 终止等待动画并显示 ✔ 标志
    initSpinner.succeed();
    isRunNpmInstall(targetDir)


  }).catch((error) => {
    console.log(symbols.error, chalk.red(error));
  });
}

//是否运行npm i
async function isRunNpmInstall(targetDir) {
  inquirer.prompt(projectNpmInstall).then(async(answers) => {
    if (answers.projectNpmInstall) {
      console.log('用户确认运行  npm install', );

      let data = {}
    if (platform === 'win32') {

      data = {
        'type': 'cmd.exe',
        'info': ['/c', 'del', '/s', '/q', targetDir + '\\.git'],
        'npm': 'npm.cmd',
        'method': ["install"],
        'path': targetDir
      }
    } else {

      data = {
        'type': 'rm',
        'info': ['-rf', targetDir + '/.git'],
        'npm': 'npm',
        'method': ["install"],
        'path': targetDir
      }
    }

      const DW = await spawn(data.npm, data.method, { cwd: data.path });
    // Spinner 初始设置
    const initSpinner = ora(chalk.cyan('正在执行 npm install...'));
    // 开始执行等待动画
    initSpinner.start();
    DW.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    DW.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    DW.on('close', (code) => {
      //  console.log(`child process exited with code ${code}`);
      initSpinner.text = 'npm install 完成';
      // 终止等待动画并显示 ✔ 标志
      initSpinner.succeed();
      data = undefined
    });
   

    } else {
      console.log('用户取消运行  npm install ');
      process.exit();
    }
  }).catch((error) => {
    console.log(symbols.error, chalk.red(error));
    process.exit();
  });
}

// 将上面的 initProject(projectName) 方法导出
module.exports = initProject;

