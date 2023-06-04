// 请求 download-git-repo 库，用于下载模板
const download = require('download-git-repo');

var child_process = require('child_process')

const { spawn } = child_process

const platform = process.platform;
// 请求 mirror.js 文件
const dataMirror = require('./mirror');


async function addTemplate (targetDir, projectSelect){
  let g =await spawn('git', ['clone','--depth=1', dataMirror[projectSelect] , targetDir],{
    timeout: 60000, // 60秒超时
  })

 
  g.on('close', (code) => {
    console.log(`Git clone exited with code ${code}`,targetDir);
    if (platform === 'win32') {
      // 删除文件夹
      const child = spawn('cmd.exe', ['/c', 'del', targetDir+'/.git']);
      child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`,'win32 下删除.git成功');
      });
    }

    const child = spawn('rm', ['-rf', targetDir+'/.git']);
    child.on('exit', (code) => {
      console.log(`Child process exited with code ${code}`,'macos 下删除.git成功');
    });
  });
  
  g.on('error', (err) => {
    console.error(`Git clone error: ${err}`);
    return `模板下载失败. ${data}`
    
  });
 
}

// 将上面的 addTemplate() 方法导出
module.exports = addTemplate;



