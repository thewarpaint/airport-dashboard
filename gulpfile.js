var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    paths = {
      js: ['app/main.js'],
      jsMin: 'app.min.js',
      css: ['app/main.scss'],
      cssMin: 'app.min.css',
      dist: 'dist'
    };

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(concat(paths.jsMin))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist))
    .pipe(notify({ message: 'Finished concatenating and minifying JavaScript'}));
});

gulp.task('styles', function () {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(concat(paths.cssMin))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist))
    .pipe(notify({ message: 'Finished compiling SASS and minifying CSS'}));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.css, ['styles']);
});

gulp.task('build', ['scripts', 'styles']);
