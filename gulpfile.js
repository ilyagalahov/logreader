var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    livereload = require('gulp-livereload');


gulp.task('scripts', function() {
    return gulp.src('lib/**/*.js')


    .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dest'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dest'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('clean', function() {
    return del(['dest/main.js', 'dest/main.min.js']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});

gulp.task('watch', function() {

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});