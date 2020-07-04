# my-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 定制主题
```
1. cnpm install element-theme -g
2. cnpm install element-theme-chalk -D
3. 初始化 et -i element-variables.scss
4. 改变element-variables.scss 主题颜色变量值
5. 生成主题样式文件到指定文件夹下 et -o src/myTheme/china
6. 全局安装 gulp gulp-css-wrap gulp-clean-css
7. 编写gulpfile.js
8. gulp css-wrap
9. main.js 引入主题文件
10. 结合vuex localStorage 刷新页面仍是改变后主题
```
