/**
 * Install: npm i --save-dev gulp gulp-util gulp-clean gulp-sync gulp-coffee gulp-jsdoc gulp-zip cron colors gulp-mocha
 * Browser: npm i --save-dev gulp-browserify gulp-uglify gulp-rename
 *
 * @todo  1) Иногда вылетает на отчистке папки docs
 */

var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);

var fs = require('fs');

var gutil = require('gulp-util');
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var zip = require('gulp-zip');

var mocha = require('gulp-mocha');

var CronJob = require('cron').CronJob;
var colors = require('colors');

// js
var coffee = require('gulp-coffee');

// jsdoc
var jsdoc = require("gulp-jsdoc");

// Client
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var insert = require('gulp-insert');

// Package
/**
 * Получает версию текущего package
 * @param {String} - Плейсхолдер вместо версии
 * @return {String} - Текущая версия
 */
function loadPackageV( placeholder ) {
    try {
        var packageJson = fs.readFileSync("./package.json").toString();
        packageJson = JSON.parse(packageJson);

        if(packageJson.version)
            var version = 'v' + packageJson.version + '';
        else 
            var version = null;
    } catch(e){
        var version = null;
    }

    if(!version && placeholder)
        version = placeholder + '';
    else if(!version)
        version = 'v' + 0 + '';

    return version;
}

/**
 * Обрабатывает ошибки
 * @param  {Error} err  - Ошибка
 */
function error(err) {
    console.log(err.toString());
    this.emit('end');
}

var paths = {
    client: {
        browserify: {
            coffee: {
                from: [
                    "./_development/overlord.coffee"
                ],
                to: "./browser/",
                standalone: "overlord",
                prepend: "/*! Overlord-js | Author: SuperPaintman | Site: FlatDev.ru */\n"
            }
        }
    },
    development: {
        coffee: {
            from: [
                "./_development/**/*.coffee"
            ],
            to: "./"
        },
        jsdoc: {
            from: [
                "./**/*.js",
                "!./gulpfile.js",
                "!./docs{,/**}",
                "!./node_modules{,/**}",
                "!./_backup{,/**}",
                "!./_development{,/**}",
                "!./_tmp{,/**}",
                //"!./browser{,/**}",
            ],
            to: "./docs/"
        },
        tmp: {
            from: [
                "./**",
                "!./",
                "!./node_modules{,/**}",
                "!./_tmp{,/**}",
                "!./_backup{,/**}",
                "!./_development{,/**}",
                "!./package.json",
                "!./run.bat",
                "!./_gulp.bat",
                "!./*.md",
                "!./gulpfile.js",
                "!./.gitignore",
                //"!./browser{,/**}",
            ], 
            to: "./_tmp/"
        },
        clean: {
            from: [
                "./_tmp/*"
            ]
        },
        backup: {
            from: [
                "./**",
                "!./_tmp{,/**}",
                "!./_backup{,/**}",
                "!./node_modules{,/**}",
                //"!./browser{,/**}",
            ],
            to: "./_backup"
        },
        test: {
            from: [
                "./test/**/test*.js"
            ]
        }
    }
};

/*============================*\
            Task
\*============================*/
/*---------------*\
    Client
\*---------------*/
gulp.task('browserify', function(next) {
    var version = loadPackageV();

    gulp.src( paths.client.browserify.coffee.from )
        .pipe(coffee({bare: true}).on('error', error))
        .pipe(browserify({
          insertGlobals: false,
          debug: false,
          standalone: paths.client.browserify.coffee.standalone
        }))
        .pipe(rename({
           suffix: '-'+version
        }))
        .pipe(gulp.dest( paths.client.browserify.coffee.to ))
        .pipe(uglify())
        .pipe(insert.prepend( paths.client.browserify.coffee.prepend ))
        .pipe(rename({
           suffix: '-min'
        }))
        .pipe(gulp.dest( paths.client.browserify.coffee.to ))
        .on('finish', next);
});

/*---------------*\
    Development
\*---------------*/
/*          *\
    Build
\*          */
gulp.task('dev-coffee', function(next) {
    gulp.src( paths.development.coffee.from )
        .pipe(coffee({bare: true}).on('error', error))
        .pipe(gulp.dest( paths.development.coffee.to ))
        .on('finish', next);
});

gulp.task('dev-jsdoc', function(next) {
    gulp.src( paths.development.jsdoc.from )
        .pipe(jsdoc.parser())
        //.pipe(gulp.dest( paths.development.jsdoc.to ));
        .pipe(jsdoc.generator( paths.development.jsdoc.to ))
        .on('finish', next);
});

/*          *\
    Clear
\*          */
gulp.task('dev-tmp', function(next) {
    gulp.src( paths.development.tmp.from )
        .pipe(gulp.dest( paths.development.tmp.to ))
        .on('error', error)
        .on('finish', next);
});

gulp.task('dev-clean', function(next) {
    gulp.src( paths.development.tmp.from, {read: false})
        .pipe(clean())
        .on('error', error)
        .on('finish', next);
});

gulp.task('dev-clean-tmp', function(next) {
    gulp.src( paths.development.clean.from, {read: false})
        .pipe(clean())
        .on('error', error)
        .on('finish', next);
});

/*          *\
    Cron
\*          */
gulp.task('dev-cron-backup', function(next) {
    new CronJob('0 */3 * * * *', function(){
        console.log(colors.green('[CRON]')+' Start make backup');
        gulp.start('dev-backup');
    }, null, true, "America/Los_Angeles");

    next();
});

/*              *\
    Backup
\*              */
gulp.task('dev-backup', function(next) {
    var time = new Date().getTime();
    var version = loadPackageV();

    gulp.src( paths.development.backup.from )
        .pipe(zip('bu-'+ version +'-'+ time +'.zip'))
        .pipe(gulp.dest( paths.development.backup.to ))
        .on('finish', next);
});

gulp.task('dev-backup-production', function(next) {
    var time = new Date().getTime();
    var version = loadPackageV();

    gulp.src( paths.development.backup.from )
        .pipe(zip('bu-P-'+ version +'-'+ time +'.zip'))
        .pipe(gulp.dest( paths.development.backup.to ))
        .on('finish', next);
});

/*              *\
    Test
\*              */
gulp.task('dev-test-mocha', function() {
    gulp.src(paths.development.test.from, {read: false})
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 2,
        }))
        .on('error', error);
        //.on('end', next);
});

/*              *\
    Watch
\*              */
gulp.task('watch', function() {
    gulp.watch( paths.development.coffee.from , gulpsync.sync([
        'dev-coffee',
    ]));

    gulp.watch( paths.development.jsdoc.from , gulpsync.sync([
        'dev-jsdoc',
    ]));
});

gulp.task('watch-test', function() {
    gulp.watch( paths.development.coffee.from , gulpsync.sync([
        'dev-coffee',
        'dev-test-mocha',
    ]));

    gulp.watch( paths.development.jsdoc.from , gulpsync.sync([
        'dev-jsdoc',
    ]));
});

/*              *\
    Init
\*              */
// Создание копии
gulp.task('tmp', gulpsync.sync([
    'dev-clean-tmp',
    'dev-tmp',
    'dev-clean',
]));
// Очистка старой сборки
gulp.task('clear', ['dev-clean']);
// Стандартный запуск
gulp.task('default', gulpsync.sync([
    'backup-cron',
    'tmp',
    'dev-coffee',
    'dev-jsdoc',
    'watch',
]));
gulp.task('default-test', gulpsync.sync([
    'default',
    'watch-test',
]));
// Запуск перед публикацией
gulp.task('production', gulpsync.sync([
    'tmp',
    'dev-coffee',
    'dev-jsdoc',
    'dev-test-mocha',
    'browserify',
    'dev-backup-production',
]));
// Разовая сборка
gulp.task('build', gulpsync.sync([
    'tmp',
    'dev-coffee',
    'dev-jsdoc',
    'browserify',
]));
// Создание бекапа
gulp.task('backup', ['dev-backup']);
gulp.task('backup-cron', ['dev-backup', 'dev-cron-backup']);
// Тесты
gulp.task('test', ['dev-test-mocha']);