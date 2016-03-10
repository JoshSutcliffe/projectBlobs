var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
// var eslint = require('gulp-eslint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// SERVER
gulp.task('server', function() {
  connect.server();
});

// BUNDLING
var bld = watchify(browserify('./assets/js/main.js'));
gulp.task('bundle', function() {
  return bld.bundle()
  .pipe( source('bundle.js') )
  .pipe( gulp.dest('build') );
  // .pipe( connect.reload() );
});

// LINTING
// gulp.task('lint', function() {
//   return gulp.src('./*.js')
//   .pipe( eslint() )
//   .pipe( eslint.format() )
//   .pipe( eslint.failOnError() );
// });

// SASS
// gulp.task('sass', function() {
//   gulp.src('./scss/*.scss')
//   .pipe( sass() )
//   .pipe( autoprefixer())
//   .pipe( gulp.dest('css') )
//   .pipe( connect.reload() );
// });

gulp.task('watch', ['bundle'], function() {
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./*.js', ['bundle']);
});

gulp.task('default', ['server', 'watch']);