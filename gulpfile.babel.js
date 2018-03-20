'use strict';

import gulp          from 'gulp';
import tap           from 'gulp-tap';
import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import yaml          from 'js-yaml';
import rimraf        from 'rimraf';
import fs            from 'fs';
import webpack       from 'webpack-stream';

// Load all Gulp plugins into $
const $ = plugins();

// Production flag
const PRODUCTION = !!(yargs.argv.production);

// Load YAML config from file
const { COMPATIBILITY, PORT, PATHS } = loadConfig();
function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// PostCSS Plugins and Options
const CSSPLUGINS = [
  // Sass-like functionality and compile-time tranforms
  require('stylelint'),
  require('postcss-easy-import')({ path: [ PATHS.css ], prefix: '_' }),
  require('postcss-advanced-variables'),
  require('postcss-nested'),
  require('postcss-define-function'),
  require('postcss-extend-rule'),
  require('postcss-math')({ functionName: 'math' }),
  require('autoprefixer')({ browsers: COMPATIBILITY }),

  // Grid
  require('lost'),

  // Utilities
  require('postcss-font-magician')({
    foundries: ['hosted google'],
    variants: { 'Muli': {} },
    hosted: ['./src/assets/fonts']
  }),
  require('postcss-pxtorem')(),
  require('postcss-custom-media'),
  require('postcss-media-minmax'),
  require('postcss-font-awesome'),
  require('postcss-assets')({ loadPaths: [PATHS.dist + '/images'], relative: 'dist/css/', cachebuster: true }),
  require('postcss-short'),
  require('postcss-image-set-polyfill')
];

gulp.task('build',
  gulp.series(clean, pages, gulp.parallel(images, css, lint, javascript)));

gulp.task('vue',
  gulp.series('build', vue, server, watch));

gulp.task('default',
  gulp.series('build', server, watch));

// gulp.task('package',
//   gulp.series('build', package));

// Delete existing 'dist' folder before running tasks
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Check 'pages' and 'data' folders, load data, run through Pug compiler, then lint and validate
function pages() {
  return gulp.src(PATHS.pages + '/*.{html,pug,php}')
    .pipe($.data(function(file) {
      return yaml.load(fs.readFileSync(PATHS.data + '/copy.yml', 'utf8'));
      // return JSON.parse(fs.readFileSync(PATHS.data + '/copy.json'))
    }))
    .pipe($.pug())
    //.pipe($.rename({extname: '.php'}))
    .pipe($.htmlhint('./.htmlhintrc'))
    .pipe($.htmlhint.reporter())
    .pipe($.if(PRODUCTION,$.w3cjs()))
    .pipe(gulp.dest(PATHS.dist));
}

// PostCSS transforms applied, CSS minified in production
function css() {
  return gulp.src(PATHS.css + '/style.css')
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.postcss(CSSPLUGINS, { parser: require('postcss-scss') } ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write('.')))
    .pipe($.if(PRODUCTION, $.postcss([require('cssnano')])))
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browser.reload({ stream: true }));
}

// Lint JS for errors and code quality
function lint() {
  return gulp.src(PATHS.root + '/js/*.js')
    .pipe($.jshint({
      esversion: 6,
      // asi: true // Surpresses missing semi-colon warning
    }))
    .pipe($.notify(function(file) {
      if(file.jshint.success) {
        return false;
      }
      var errors = file.jshint.results.map(function(data) {
        if(data.error) {
          return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join('\n');
      return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
    }));
}

// Compile, uglify, and concat JS files
function javascript() {
  return gulp.src(PATHS.entries.js)
    .pipe($.sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe($.concat('app.js', {
      newLine:'\n;'
    }))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

function vue() {
  return gulp.src(PATHS.entries.vue)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

// Move images to 'dist' (Add minification here later)
function images() {
  return gulp.src(PATHS.root + '/images/**/*')
    .pipe(gulp.dest(PATHS.dist + '/images'));
}

// Run BrowserSync for watching folder changes
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT, open: false
  });
  done();
}

// Watch folders and run tasks upon change
function watch() {
  gulp.watch(PATHS.assets);
  gulp.watch(PATHS.pages + '/**/*').on('all', gulp.series(pages, browser.reload));
  gulp.watch(PATHS.data + '/**/*').on('all', gulp.series(pages, browser.reload));
  gulp.watch(PATHS.css + '/**/*.{css,scss}').on('all', css);
  gulp.watch(PATHS.root + '/js/**/*.{js}').on('all', gulp.series(javascript, browser.reload));
  gulp.watch(PATHS.root + '/js/**/*.{vue}').on('all', gulp.series(vue, browser.reload));
  gulp.watch(PATHS.root + '/images/**/*').on('all', gulp.series(images, browser.reload));
}
