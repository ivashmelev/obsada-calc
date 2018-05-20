var gulp = require('gulp');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');

const build = function () {
    return gulp.src('app/main.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('build'));
}
gulp.task('webpack:prod', function(){
    process.env.NODE_ENV = 'production';
    return build();
});

gulp.task('webpack:dev', function(){
    process.env.NODE_ENV = 'development';
    return build();
});

// Default task
gulp.task('default', ['webpack:dev']);