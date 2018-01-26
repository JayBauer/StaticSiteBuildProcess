'use strict';

import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import yaml          from 'js-yaml';
import rimraf        from 'rimraf';
import fs            from 'fs';
import webpack       from 'webpack-stream';

const $ = plugins();
const PRODUCTION = !!(yargs.argv.production);
const { COMPATIBILITY, PORT, PATHS } = loadConfig();

const PLUGINS = [
  // Sass-like functionality and compile-time tranforms
  require('postcss-partial-import')({root: PATHS.css, prefix: '_'}),
  require('stylelint'),
  require('postcss-nested'),
  require('postcss-advanced-variables'),
  require('postcss-define-function'),
  require('autoprefixer')({ browsers: COMPATIBILITY }),

  // Utilities
  require('postcss-font-magician'),
  require('postcss-custom-media'),
  require('postcss-media-minmax'),
  require('postcss-assets')({ loadPaths: [PATHS.dist + '/images'], cachebuster: true }),
  require('postcss-short'),
  require('postcss-image-set-polyfill'),
];

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

gulp.task('build',
  gulp.series(clean, gulp.parallel(pages, css, javascript, images)));

  gulp.task('default',
    gulp.series('build', server, watch));
//
// gulp.task('package',
//   gulp.series('build', package));

function clean(done) {
  rimraf(PATHS.dist, done);
}

function pages() {
  return gulp.src(PATHS.pages)
    .pipe(gulp.dest(PATHS.dist));
}

function images() {
  return gulp.src(PATHS.root + '/images/**/*')
    .pipe(gulp.dest(PATHS.dist + '/images'));
}

function css() {
  return gulp.src(PATHS.root + '/css/app.css')
    .pipe($.sourcemaps.init())
    .pipe($.postcss(PLUGINS))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write('.')))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    .pipe($.if(PRODUCTION, $.postcss([require('cssnano')])))
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browser.reload({ stream: true }));
}

function javascript() {
  return gulp.src(PATHS.entries)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/js'));
}

function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT, open: false
  });
  done();
}

function watch() {
  gulp.watch(PATHS.assets);
  gulp.watch(PATHS.pages).on('all', gulp.series(pages, browser.reload));
  gulp.watch(PATHS.css + '.{css}').on('all', css);
  gulp.watch(PATHS.root + '/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch(PATHS.root + '/images/**/*').on('all', gulp.series(images, browser.reload));
  //gulp.watch(PATHS.root + '/fonts/**/*').on('all', gulp.series(fonts, browser.reload));
}
