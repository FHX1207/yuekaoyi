const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');//压缩html
const Sass = require('gulp-sass');//编译sass
const autoprefixer = require('gulp-autoprefixer');//css自动加浏览器内核前线
const minCss = require('gulp-clean-css');//压缩css
const concat = require('gulp-concat');//合并
const uglify=require('gulp-uglify');//压缩JS
const babel = require("gulp-babel"); //es6-es5
const webserver = require('gulp-webserver');

//开发环境
gulp.task("devSass",()=>{
  return  gulp.src("./src/sass/*.scss")
     .pipe(Sass())//编译sass;
     .pipe(gulp.dest("./src/css"))
})

gulp.task("watching",()=>{
    gulp.watch("./src/sass/*.scss",gulp.series("devSass"))
})

//静态资源
gulp.task("server",()=>{
 return   gulp.src("./src/")
    .pipe(webserver({
        port:6060,//监听端口号
        open:true,//自动打开浏览器
        livereload:true,//自动刷新 热更新
        proxies:[//反向代理  跨域 拦截处理 代理
           {source:"/usernameInfo",target:"http://localhost:3000/usernameInfo"},
           {source:"/users/login",target:"http://localhost:3000/users/login"},
        ]
    }))
})

gulp.task("default",gulp.series("devSass","server","watching"))



//生产环境线上环境
gulp.task("devHtml",()=>{
    return gulp.src("./src/pages/*.html")
  .pipe(htmlmin({
    collapseWhitespace: true,//压缩HTML
  }))
    .pipe(gulp.dest("./dist"))
})



gulp.task("devJs",()=>{
    return gulp.src("./src/js/page/*.js")
    .pipe(babel({
        presets: ['env']
    }))//es6转es5.
    .pipe(uglify())//压缩JS;
    .pipe(concat("all.js"))//合并所有js;
    .pipe(gulp.dest("./dist/js"))
    // .pipe(gulp.dest("./src/js"))
})

gulp.task("devSass",()=>{
    return  gulp.src("./src/sass/*.scss")
       .pipe(Sass())//编译sass;
       .pipe(autoprefixer(//css自动加浏览器内核前线
           {
               browsers:["last 2 version"]//当前浏览器最新两个版本
           }
       ))
       .pipe(minCss())//压缩css
       .pipe(concat("all.css"))//合并
       .pipe(gulp.dest("./dist/css"))//固定结束路径。
    //    .pipe(gulp.dest("./src/css"))
  })

gulp.task("watching",()=>{
    gulp.watch("./src/sass/*.scss",gulp.series("devSass"))
     gulp.watch("./src/js/*.js",gulp.series("devJs"))
     gulp.watch("./src/pages/*.html",gulp.series("devHtml"))
})
gulp.task("build",gulp.series("devSass","devHtml","devJs","watching"))