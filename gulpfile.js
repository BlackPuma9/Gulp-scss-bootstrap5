const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { parallel } = require('gulp');
const { series } = require('gulp');
const fileinclude = require('gulp-file-include');
const clean = require('gulp-clean');
const fs = require('fs');


const cleanFiles = () => {
    return gulp.src('./dist/')
        .pipe(clean());
};
const htmlCompile = () => {
    return gulp.src('./src/pages/*.html')
        .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }
        ))
        .pipe(gulp.dest('./dist/'));
};

const scssCompile = () => {
    return gulp.src('./src/scss/pages/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
};

const copyImage = () => {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'));
};

const imagesOptimize = (done) => {
    console.log('Image Optimization');
    done();
};

exports.default = series(cleanFiles,(parallel(htmlCompile, scssCompile, copyImage)));
exports.layoutCompile = parallel(scssCompile, htmlCompile);
exports.assetsOptimize = imagesOptimize;