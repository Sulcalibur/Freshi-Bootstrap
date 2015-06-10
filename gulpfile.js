var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    prettify    = require('gulp-prettify'),
    sass        = require('gulp-sass'),
    minifyCSS   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    browserSync = require('browser-sync')
    // imagemin      = require('gulp-imagemin'),
    // autoprefix    = require('gulp-autoprefixer'),
    // notify        = require('gulp-notify'),
    // uncss         = require('gulp-uncss'),
    // markdown      = require('gulp-markdown'),
    // concat        = require('gulp-concat'),
    // bower         = require('gulp-bower'),
    watch       = require('gulp-watch')
    ;

  // Markup Tasks
  gulp.task('markup', function() {
    gulp.src('project/*.jade')
    .pipe(jade())
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('build/'));
  });

  // gulp.task('sass', function () {
  //   gulp.src('project/assets/*.scss')
  //   .pipe(sass())
  //   .pipe(gulp.dest('build/css'));
  // });

  // JavaScript Tasks
  gulp.task('scripts', function(){
    gulp.src('js/*.js')
    gulp.src('bower_components/modernizr/modernizr.js')
    gulp.src('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js')
    //.pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js/'))
  });


  // Styles Tasks
  gulp.task('styles', function() {
    gulp.src('project/assets/styles/*.scss')
    .pipe(sass({
      style: 'compress'
    }))
    // .pipe(uglify())
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('build/assets/css/'))
    // .pipe(gulp.dest('build/css/'))
  });

  gulp.task('browser-sync', function () {
    var files = [
    'build/assets/**/*.html',
    'build/assets/css/**/*.css',
    'build/assets/img/**/*.svg',
    'build/assets/img/**/*.jpg',
    'build/assets/img/**/*.gif',
    'build/assets/img/**/*.png',
    'build/assets/js/**/*.js'
    ];

    browserSync.init(files, {
      server: {
        baseDir: './build'
      }
    });
  });

  // Watch Task
  gulp.task('watchkirby', function() {
    // gulp.watch('project/**/*.jade', ['markup']);
    gulp.watch('project/assets/styles/**/*.scss', ['styles']);
  });

  // Watch Task
  gulp.task('watch', function() {
    gulp.watch('project/**/*.jade', ['markup']);
    gulp.watch('project/assets/styles/**/*.scss', ['styles']);
  });

  // Default task to be run with `gulp`
  gulp.task('default', ['markup','styles','watch','browser-sync']);

  // Kirby Tasks
  gulp.task('Kirby',['styles','watchkirby'])
