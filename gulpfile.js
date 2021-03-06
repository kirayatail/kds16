'use strict';

var gulp = require('gulp');
var filter = require('gulp-filter');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');

gulp.task('deps', function() {
  var sweetalert = gulp.src('./node_modules/sweetalert/dist/**')
    .pipe(gulp.dest('./frontend/lib/sweetalert'));

  var tinymce = gulp.src('./node_modules/angular-ui-tinymce/dist/**')
    .pipe(gulp.dest('./frontend/lib/tinymce'));

  var customSelect = gulp.src('./node_modules/js-custom-select/**')
    .pipe(filter(['**/js/*.js', '**/css/*.css']))
    .pipe(gulp.dest('./frontend/lib/js-custom-select'));

  return merge(sweetalert, tinymce, customSelect);
});

gulp.task('sass', function () {
  return gulp.src(['./frontend/**/*.scss', '!./frontend/lib/**'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./frontend/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./frontend/**/*.scss', ['sass']);
});

gulp.task('default', ['deps', 'sass', 'sass:watch']);
gulp.task('build', ['deps', 'sass']);
