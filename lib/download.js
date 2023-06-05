// 请求 download-git-repo 库，用于下载模板
const download = require('download-git-repo');

const child_process = require('child_process')

const { spawn } = child_process

const platform = process.platform;
// 请求 mirror.js 文件
const dataMirror = require('./mirror');

// 请求 ora 库，用于初始化项目时等待动画
const ora = require('ora');

// 请求 chalk 库
const chalk = require('chalk');

async function addTemplate(targetDir, projectSelect) {
  let g = await spawn('git', ['clone', '--depth=1', dataMirror[projectSelect], targetDir], {
    timeout: 60000, // 60秒超时
  })


  g.on('close', async (code) => {
    // console.log(`Git clone exited with code ${code}`, targetDir);
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

    // 删除文件夹
   
    const child = await spawn(data.type, data.info);
    child.on('exit', (code) => {
      // console.log(`child process exited with code ${code}`);
      data = undefined
    });
   
   


  });

  g.on('error', (err) => {
    console.error(`Git clone error: ${err}`);
    return `模板下载失败. ${data}`

  });

}

// 将上面的 addTemplate() 方法导出
module.exports = addTemplate;



