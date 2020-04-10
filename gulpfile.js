const { watch, src, dest, series } = require('gulp');
//переименование файлов
const rename = require('gulp-rename')
const cssmin = require('gulp-cssmin');
// соединение файлов
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer');

//все итоговые файлы у нас уходят в папку билд


function copyHtml() {
  return src('*.html')
    .pipe(dest('build/'));
}

function copyCss(){
    // подтянуть несколько css файлов, сжать, переименовать, и положить в итоговый билд
    return src(['node_modules/bulma/css/bulma.css', 'node_modules/font-awesome/css/font-awesome.css'])
    .pipe(cssmin())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(rename({suffix:".min"}))
    .pipe(dest('build/css'));
}


function getFonts(){
    return src('node_modules/font-awesome/fonts/*.*')
    .pipe(dest('build/fonts'));


}

function getJs(){
return src('dist/*.js')
    .pipe(dest('build/'));
}


exports.build = series(copyHtml, copyCss, getJs, getFonts);

function getReady(){
    copyHtml()
    copyCss()
    getJs()
    getFonts()
}


exports.default = function() {
    // You can use a single task
    getReady()
    watch('*.html', copyHtml);

    watch('dist/*.js', getJs);


    // Or a composed task
    // watch(['dist/*.js', '*.html'], series(copyHtml, copyCss, getJs));
  };