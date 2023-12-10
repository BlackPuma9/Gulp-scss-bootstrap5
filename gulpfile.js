const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
}
gulp.task('includeFiles', function () {
    return gulp.src('./src/pages/*.html')
        .pipe(fileinclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'))
})

