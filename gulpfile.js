var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

gulp.task('style', function () { 
	return gulp.src("src/sass/style.scss") 
		.pipe(plumber())
		.pipe(sass()) 
		.pipe(gulp.dest('./css')) 
		.pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('style', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("src/sass/style.scss", gulp.series('style'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));