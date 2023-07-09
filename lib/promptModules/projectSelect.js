//projectSelect.js

module.exports = [{
    type: 'list',
    message: '请选择要创建的模板',
    name: 'projectSelect',
    default: 0,
    choices: [
      {value: 0, name: 'vue2 移动端模板'},
      {value: 1, name: 'vue2 PC端后台模板'},
      {value: 2, name: 'vue3 移动端模板'},
      {value: 3, name: 'vue3 PC端后台模板'},
      {value: 4, name: 'vue2 微信小程序模板'},
      {value: 5, name: 'react pc端后台模板'}
    ]
  }];
  