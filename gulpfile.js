var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

/* 
	Copy third party libraries from 'node_modules' into 'build/vendor'
*/
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./build/vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./build/vendor/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./build/vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./build/vendor/jquery-easing'))

});

/*
	Compile SCSS files
*/
gulp.task('css:compile', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
});

/*
	Minify CSS files (dependant on 'css:compile' to finish first)
*/
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './build/css/*.css',
      '!./build/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

/*
	Minify JavaScript files
*/
gulp.task('js:minify', function() {
  return gulp.src([
      './src/js/*.js',
      '!./src/js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

/*
	Move *.html files in root to build
*/
gulp.task('other:copy', function() {
  return gulp.src([
      './src/*.*'
    ])
    .pipe(gulp.dest('./build'))
});

/*
	Minify (compress/optimize) images
*/
gulp.task('images:minify', function() {
  return gulp.src([
      './src/img/**/*.jpg',
      './src/img/**/*.svg',
      './src/img/**/*.png',

    ])
    .pipe(gulp.dest('./build/img'))
});


/*
	Configure the browserSync task
*/
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});

///////////////////////////////////
// Task definitions
///////////////////////////////////

gulp.task('css',  ['css:compile', 'css:minify']);
gulp.task('js', ['js:minify']);
gulp.task('images', ['images:minify']);
gulp.task('other', ['other:copy']);

// define default task
gulp.task('default', ['css', 'js', 'vendor', 'images', 'other']);

// Dev task
gulp.task('dev', ['css', 'js',  'images', 'other', 'browserSync'], function() {
  gulp.watch('./src/scss/*.scss', ['css']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/*.*', browserSync.reload); // TODO Fix this (different folder now)
});