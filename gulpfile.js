var gulp = require('gulp');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');

// Run webpack
gulp.task('webpack', function(){
    return gulp.src('app/main.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('build'))
});

// Default task
gulp.task('default', ['webpack']);