const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const pug = require('gulp-pug');


const browserSyncJob = () => {
    browserSync.init({
        server: './dist/'
    });
};

const reload = (done) => {
    browserSync.reload();
    done();
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


const watchers = () => {
    gulp.watch('./src/pages/*.pug', gulp.series(htmlCompile,reload));
    gulp.watch('./src/scss/*.scss', gulp.series(scssCompile, reload));

};


exports.default = gulp.series(cleanFiles,
    gulp.parallel(htmlCompile, scssCompile),
    gulp.parallel(browserSyncJob, watchers)
);