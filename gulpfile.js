/**
 * Created by jetbrains on 23.04.2014.
 */
var gulp = require('gulp');

var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');

var paths = {
    main: 'app/scripts',
    html: 'app/index.html',
    outJsFile: 'bundle.js',
    outCssFile: 'bundle.css'
};

gulp.task('scripts', function () {
    return rjs({name: 'main',
        baseUrl: paths.main,
        mainConfigFile: "app/scripts/main.js",
        paths: {
            jquery: 'empty:'
        },
        out: paths.outJsFile
    }).
        pipe(uglify()).
        pipe(gulp.dest('./dist/'));
})
;

gulp.task('css', function () {
    return gulp.
        src(['app/scripts/**/*.css']).
        pipe(concat('bundle.css')).
        pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    return gulp.src(paths.html).
        pipe(htmlreplace({
            'css': paths.outCssFile,
            'js': paths.outJsFile
        })).
        pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['scripts', 'css', 'html']);