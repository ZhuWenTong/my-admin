var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')
gulp.task('css-wrap', function () {
    return gulp.src(path.resolve('./src/myTheme/success/index.css'))
    /* 找需要添加命名空间的css文件，支持正则表达式 */
    .pipe(cssWrap({
        selector: '.custom-success' /* 添加的命名空间 */
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/assets/themes/success')) /* 存放的目录 */
})
