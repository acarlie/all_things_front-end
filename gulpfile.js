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
    return gulp.src('app/public/assets/sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('app/public/assets/dist'))
        .pipe(clean())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/public/assets/dist'));
});

// command is 'gulp prefix-min --option yourCssFile'
gulp.task('prefix-min', function () {
    return gulp.src(`app/public/assets/css/${process.argv[4]}.css`)
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('app/public/assets/dist'))
        .pipe(clean())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/public/assets/dist'));
});

gulp.task('watch', function () {
    gulp.watch('app/public/assets/sass/*.scss', gulp.series('css'));
});
