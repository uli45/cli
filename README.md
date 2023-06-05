
<div style="text-align:center">
<b style="font-size:30px">ucli</b>
<p>一个快速搭建vue2&vue3 移动端、pc端、微信小程序基础框架的脚手架</p>
<br />
<img style="display:inline" src="https://img.shields.io/npm/v/uli-cli" />

<img style="display:inline;margin-left:10px" src="https://img.shields.io/npm/dt/uli-cli" />

[![uli的github](https://img.shields.io/badge/github-求star-success.svg?style=plastic)](https://github.com/uli45/cli.git)
[![uli的gitee](https://img.shields.io/badge/gitee-求star-success.svg?style=plastic)](https://gitee.com/uli1/cli.git)
</div>

##  使用方法

 **1.全局安装**

```bash
npm i  uli-cli -g
```
**2，查看版本**

```bash
uli -v 
```
**3，创建基础框架**

```bash
uli create  xxx  //xxx为项目名称
```

<br />

![可选基础模版](https://uli-1312516416.cos.ap-guangzhou.myqcloud.com/uli-cli.png)

<br />

<br />

## 如果你也想创建属于你自己的脚手架，请先`fork`本仓库  然后 `git clone` 到本地 

 - 1， 修改 `mirror.js` 文件 内的导出项，该导出项为你的模版地址
  
 - 2， 可以修改 `lib-promptModules-projectSelect` 下的 `choices` 选项为你的自定义选项，该选项会在用户选择模版时显示的文字， `package.json` 文件内的 `bin` 下的 `uli` 为项目运行命令， 你也可以自定义为你自己的命令  `package.json` 文件内的 `name` 是你要发布到`npm`的包名， 执行`npm i xxx -g`命令 就会把 `xxx`包安装为全局包，（`xxx` 为你的包的名字）
    
   
 ![可选基础模版](https://uli-1312516416.cos.ap-guangzhou.myqcloud.com/uli-cli-1.png)

  ![可选基础模版](https://uli-1312516416.cos.ap-guangzhou.myqcloud.com/uli-cli-3.png)

- 3，如果想要增加别的功能或者提示，请参考 `create.js` 内的函数调用
  
- 4，然后去 [npm官网](https://www.npmjs.com/) 注册账号 （需要科学上网）

- 5， 终端 登陆npm  `npm login`
  
- 6, 执行 `npm publish` 发布包到npm  发布成功如图

  ![发布成功如图](https://uli-1312516416.cos.ap-guangzhou.myqcloud.com/uli-cli-4.png)

- 7,最后你就拥有了一个属于自己的`cli` 

##  `npm i uli-cli  -g` 后测试成功运行

![成功运行](https://uli-1312516416.cos.ap-guangzhou.myqcloud.com/uli-cli-2.png)

## 注：上传的 npm 包，在 72小时 后不可删除，如果是测试用的包，记得 72小时 内删除。

 <br />

<br />

**在此感谢** [安静的天空](https://blog.csdn.net/weixin_42855188/article/details/130595059) **大佬的教程**

<br />

<br />

