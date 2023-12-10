const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
}
gulp.task('includeFiles', function () {
    return gulp.src('./src/pages/*.html')
        .pipe(fileinclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', function () {
    return gulp.src('./src/scss/pages/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('copyImages', function () {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'))
})



