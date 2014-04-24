/**
 * Created by jetbrains on 23.04.2014.
 */
var gulp = require('gulp');

var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');

var paths = {
    main: 'app/scripts',
    html: 'app/index.html',
    outCss: 'bundle.css',
    outJsFileName: 'bundle.js'
};

gulp.task('scripts', function () {
    return rjs({name: 'main',
        baseUrl: paths.main,
        mainConfigFile: "app/scripts/main.js",
        out: paths.outJsFileName}).
        pipe(uglify()).
        pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    return gulp.src(paths.html).
        pipe(htmlreplace({
            'js': paths.outJsFileName
        })).
        pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['scripts', 'html']);