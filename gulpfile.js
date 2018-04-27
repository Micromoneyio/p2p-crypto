let gulp = require('gulp');
let less = require('gulp-less');
let path = require('path');
let mocha = require('gulp-mocha');
let browserSync = require('browser-sync');
let nodemon = require('gulp-nodemon');
let cp = require('child_process');
let tsb = require('gulp-tsb');
const fs   = require('fs');


// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
gulp.task('less', function () {
    return gulp.src('./src/styles/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./out/public/stylesheets'));
});


// run browser-sync on for client changes
gulp.task('browser-sync', ['nodemon', 'watch'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["out/**/*.*", "out/routes/**/*.*", "out/public/**/*.*", "out/views/**/*.*"],
        port: 7000,
    });
});

// run nodemon on server file changes
gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: 'out/index.js',
        watch: ['out/*.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);  // browserSync reload delay
    });
});

// TypeScript build for /src folder 
var tsConfigSrc = tsb.create('src/tsconfig.json');
gulp.task('build', function () {
    gulp.src(['.env', 'swagger.json', 'package.json'])
        .pipe(gulp.dest('./out'))

    return gulp.src('./src/**/*.ts')
        .pipe(tsConfigSrc())
        .pipe(gulp.dest('./out'))
});

// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['build']);
    gulp.watch('src/styles/**/*.less', ['less']);
}); 

gulp.task('buildAll', ['build', 'less']);
gulp.task('default', ['browser-sync']);


gulp.task('copyForDeploy', function () {
    if (!fs.existsSync("dist")){
        fs.mkdirSync("dist");
    }
    gulp.src('./out/**/*.js')
        .pipe(gulp.dest('./dist'));
    gulp.src(['.env', 'swagger.json', 'package.json'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('prepareForDeploy', ['buildAll', 'copyForDeploy']);

