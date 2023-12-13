const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const pug = require('gulp-pug');

const browserSyncJob = () => {
    const files = [
        './**/*'
    ];
    browserSync.init(files,{
        server: './dist'
    });
    gulp.watch('./src/pages/*.pug', htmlCompile).on('change', browserSync.reload);
    gulp.watch('./src/scss/*.scss',scssCompile).on('change', browserSync.reload);
};

const cleanFiles = function (done) {
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/', {read: false})
            .pipe(clean());
    }
    done();
};
const htmlCompile = () => {
    return gulp.src('./src/pages/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./dist/'));
};

const scssCompile = () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
};

exports.default = gulp.series(cleanFiles,
    gulp.parallel(htmlCompile, scssCompile), browserSyncJob);