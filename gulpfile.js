var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    minifyCSS = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
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
    .pipe(livereload())
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
    .pipe(livereload())
    .pipe(notify({ message: 'Finished compiling SASS and minifying CSS'}));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.css, ['styles']);
});

gulp.task('build', ['scripts', 'styles']);
