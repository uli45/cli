

const projectNpmInstall = {
    type: 'confirm',
    message: '是否需要为该项目运行  npm install ?',
    name: 'projectNpmInstall',
    default: 'true'
}

const projectNpmRun = {
    type: 'confirm',
    message: '是否需要为该项目运行 npm run dev ?',
    name: 'projectNpmInstall',
    default: 'true'
}

module.exports = {
    projectNpmInstall,
    projectNpmRun
}