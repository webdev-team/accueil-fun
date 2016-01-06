var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var pixrem = require('gulp-pixrem');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var del = require('del');
var consolidate = require("gulp-consolidate");
var rename = require('gulp-rename');
var base64 = require('gulp-base64');
var imagemin = require('gulp-imagemin');

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build/'))
});

gulp.task('css', function () {
    return gulp.src('src/scss/*.css')
        .pipe(gulp.dest('build/css/'))
});

gulp.task('img', function () {
    return gulp.src('src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img/'))
});

gulp.task('font', function () {
    return gulp.src('src/font/*.*')
        .pipe(gulp.dest('build/font'))
});

gulp.task('clean', function (cb) {
    del(['build'], cb);
});

gulp.task('build', function (cb) {
    runSequence('clean', ['img', 'css', 'font', 'js', 'html'], cb);
});

gulp.task('watch', function () {
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/img/**', ['img']);
    gulp.watch('src/scss/*.scss', ['css']);
    gulp.watch('src/js/*.js', ['js']);
});

gulp.task('webserver', function () {
    return gulp.src('./')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            port: 8282,
            host: '0.0.0.0',
            open: true
        }))
});

gulp.task('work', ['img', 'css', 'html', 'font', 'js', 'webserver', 'watch']);