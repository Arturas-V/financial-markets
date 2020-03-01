'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./app/styles/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/styles/css'));
});
   
gulp.task('sass:watch', function () {
    gulp.watch('./app/styles/sass/*.scss', gulp.series('sass'));
});