# 创建项目
npx create-react-app name
npx create-react-app name --template typescript

# 添加sass
yarn add sass -D

# prop-types  props类型校验
yarn add prop-types

# 添加路由
yarn add react-router-dom

# uuid  生成独一无二的id
yarn add uuid

# 添加antd
yarn add antd

# 样式初始化
npm i reset-css

# 添加craco配置webpack 并创建craco.config.js
yarn add @craco/craco -D

# 添加配置jsconfig.json 让vscode 有别名提示

# 安装axios
yarn add axios

# 添加mobx  lite
yarn add mobx mobx-react-lite

# 添加redux
yarn add redux react-redux

# 添加redux toolkit (RTK)
yarn add @redux/toolkit

# 添加echarts 
yarn add echarts

# 添加富文本编辑器 react-quill需要安装beta版本适配react18 否则无法输入中文
yarn add react-quill@2.0.0-beta.2

# 打包文件体积分析插件 配置在package.json中
# "scripts": {  
#  "analyze": "source-map-explorer 'build/static/js/*.js'",
# }
yarn add source-map-explorer

# package.json中添加proxy: "http://"  配置单个代理解决跨域
# 添加 setupProxy.js                  配置多个代理 

# 全局安装本地服务包 npm i -g serve  该包提供了serve命令，用来启动本地服务 
# 在项目根目录中执行命令 serve -s ./build  在build目录中开启服务器