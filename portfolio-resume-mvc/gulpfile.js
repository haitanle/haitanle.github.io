const gulp = require("gulp");
const browserSync = require('browser-sync').create();

// gulp.task("styles", function(){
// 	return gulp
// 		.src("sass/**/*.scss")
// 		.pipe(sass())
// 		.on("error", sass.logError)
// 		.pipe(gulp.dest("./css"))
// 		.pipe(browserSync.stream());
// });

gulp.task("default", function(){
	
	browserSync.init({server:"./"});
	gulp.watch("css/*.css").on('change', browserSync.reload);
	gulp.watch("index.html").on('change', browserSync.reload);
});
