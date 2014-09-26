'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var compass = require('gulp-compass');
var path = require('path');
var url = require('url');
var spawn = require('child_process').spawn;
var filed = require('filed');
var fs = require('fs');
var manifest = require('gulp-manifest');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 9',
  'ff >= 4',
  'chrome >= 18',
  'safari >= 4',
  'opera >= 20',
  'ios >= 5',
  'android >= 2',
  'bb >= 9'
];


// This proxy works better as updates the hostname
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});


// -------------------------------------------
// development
// -------------------------------------------
// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// use compass watch to only compile files when necessary
gulp.task('dev:styles', function () {
  var options = ['watch',
    process.cwd(),
    '--relative-assets',
    '--output-style',
    'nested',
    '--css-dir',
    '.tmp',
    '--sass-dir',
    'app',
    '--boring'
  ];

  var child = spawn('compass', options, process.cwd());
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (data) {
    console.log(data);
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
    console.log(data);
  });
});

// optimise Images
gulp.task('dev:images', function () {
  return gulp.src([
        'app/**/*.png',
        'app/**/*.jpg',
        'app/**/*.gif',
        'app/**/*.svg',
        '!app/layout/fonts/**/*.svg'
    ]).pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('.tmp'))
    .pipe($.size({title: 'dev:images'}));
});

// Watch Files For Changes & Reload
gulp.task('browser-sync', function () {
  var baseDirs = ['.tmp', 'app', 'bower_components'];
  var indexPath = path.join(__dirname, 'app', 'index.html');

  browserSync.init(['.tmp/**/*.css', 'app/**/*.js'], {
    notify: false,
    port: 9000,
    open: false,
    host: '0.0.0.0',
    server: {
      baseDir: baseDirs,
      index: 'index.html',
      middleware: [
        // proxy auth and api requests
        function(req, res, next) {
          if ((req.url.indexOf('/control/') === 0) || (req.url.indexOf('/auth') === 0) || (req.url.indexOf('/api') === 0)) {
            proxy.web(req, res, {
              target: 'http://127.0.0.1:3000'
            });
          } else {
            next();
          }
        },

        // handle angular html5 links
        function(req, res, next) {
          // rewrite angular routes to /index.html, so /groups is served by
          // the main index page. also rewrite requests to directories with
          // index.html files, so /login is served by /login/index.html if
          // the index file exists. the modified or original url is passed
          // through to browser sync so it can inject its reload js.
          var fileName = url.parse(req.url).pathname;
          if (fileName[0] == '/')
            fileName = fileName.slice(1);

          // short circuit on requests to static files (i.e with extensions)
          if (path.extname(fileName) != '')
            return next();

          // try and serve the path or an index file within it
          for (var i = 0; i < baseDirs.length; ++i) {
            var dirPath = path.join(baseDirs[i], fileName);

            if (fs.existsSync(dirPath)) {
              var dirIndexPath = path.join(dirPath, 'index.html');
              if (fs.existsSync(dirIndexPath))
                req.url = '/' + path.join(fileName, 'index.html');
              else
                req.url = '/' + fileName;
              return next();
            }
          }

          // otherwise fallback to the main index file
          req.url = '/index.html';
          next();
        }
      ]
    }
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch([
    'app/**/*.png',
    'app/**/*.jpg',
    'app/**/*.svg',
    'app/**/*.gif'
  ], ['dev:images', reload]);
});

gulp.task('serve', ['dev:styles', 'browser-sync']);



// -------------------------------------------
// production
// -------------------------------------------
// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe($.useref.assets({searchPath: '{.tmp,app,bower_components}'}))
    
    // Concatenate And Minify JavaScript
    .pipe($.if('*.js', $.uglify({
      preserveComments: function () {
        return false;
      }
    })))
    
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe($.useref.restore())
    .pipe($.useref())
    
    // Minify Any HTML
    //.pipe($.if('*.html', $.minifyHtml()))
    
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src([
        'app/layout/fonts/**/*.ttf',
        'app/layout/fonts/**/*.svg',
        'app/layout/fonts/**/*.woff',
        'app/layout/fonts/**/*.eot'
    ]).pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'fonts'}));
});

// Copy optimised images from tmp to dist
gulp.task('prod:images', function () {
  return gulp.src([
        '.tmp/**/*.png',
        '.tmp/**/*.jpg',
        '.tmp/**/*.gif',
        '.tmp/**/*.svg',
        '!.tmp/layout/fonts/**/*.svg'
    ], {dot: false}).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'prod:images'}));
});

// compile sass
gulp.task('prod:styles', function () {
  return gulp.src(['app/**/*.scss'])
    .pipe(compass({
      css: '.tmp',
      sass: 'app'
    }));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
  return gulp.src(['app/*','!app/*.html'], {dot: true})
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

// copy specially created js files
gulp.task('js:copy', function () {
  return gulp.src(['.tmp/scripts/condo-hash-worker.js','.tmp/scripts/condo-hash-worker-emulator.js'])
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size({title: 'js:copy'}));
});

// copy select 2 images
gulp.task('select2:copy', function () {
  return gulp.src(['bower_components/select2/*.png', 'bower_components/select2/*.gif'])
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'js:copy'}));
});

// Makes the site available offline.
// Requires the site to be cache aware
gulp.task('prod:manifest', function() {
  gulp.src(['dist/**/*'])
    .pipe(manifest({
      hash: true,
      network: ['http://*', 'https://*', '*'],
      filename: 'app.appcache',
      exclude: 'app.appcache'
     }))
    .pipe(gulp.dest('dist'));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('prod:styles', 'dev:images', 'prod:images', 'jshint', 'html', 'fonts', 'copy', 'js:copy', 'select2:copy', 'prod:manifest', cb);
});

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
