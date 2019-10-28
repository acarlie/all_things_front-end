const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('hello', function () {
    return new Promise((resolve, reject) => {
        console.log('hello');
        resolve();
    });
});

gulp.task('css', function () {
    return gulp.src('public/assets/sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(clean())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function () {
    gulp.watch('public/assets/sass/*.scss', gulp.series('css'));
});
