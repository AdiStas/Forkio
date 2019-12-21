var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');

gulp.task('style', function () { 
	return gulp.src("src/sass/style.scss") 
		.pipe(plumber())
		.pipe(sass()) 
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest('./src/css')) 
		.pipe(browserSync.stream())
		.pipe(csso())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./src/css'));
});

gulp.task('serve', gulp.series('style', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("src/sass/**/*.scss", gulp.series('style'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('images', function() {
	return gulp.src('./src/img/**/*.{png,jpg,svg}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true}),
			imagemin.svgo()
			]))
		.pipe(gulp.dest('./src/img'));
});

gulp.task('copy', function() {
	return gulp.src([
		'./src/fonts/**/*.{woff,woff2}',
		'./src/img/**',
		'./src/js/**',
		'./src/css/style.min.css'
		], {
			base: './src'
		})
		.pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series(gulp.parallel('style', 'images'), 'copy'));
