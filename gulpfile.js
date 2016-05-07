/*===========================*/
/* SCSS Compile 						 */
/*===========================*/
var autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    exec = require('child_process').exec,
    gulp = require('gulp'),
    gutil = require('gulp-util'),
		newer = require('gulp-newer'),
		runSequence = require('run-sequence'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
		iconfont = require('gulp-iconfont'),
		consolidate = require('gulp-consolidate'),
		rename = require('gulp-rename'),
		browserSync = require('browser-sync').create(),
		runTimestamp = Math.round(Date.now()/1000);

/*===========================*/
/* BrowserSync  						 */
/*===========================*/
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy:{
          target: "http://localhost:8888/1839",
        }
    });
});
/*===========================*/
/* Error Handling 		  		 */
/*===========================*/
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

/*===========================*/
/* SCSS Compile 						 */
/*===========================*/
gulp.task('scss', function() {

return sass('scss/application.scss',{
	style : 'compressed'
})
.on("error", handleError)
.pipe(autoprefixer({
	browsers: ['> 1%', 'last 4 versions', 'Firefox ESR', 'Opera 12.1'],
  cascade: false
}))
.pipe(gulp.dest('assets/css'))
.pipe(browserSync.stream());
});


/*===========================*/
/* JS Compile 						   */
/*===========================*/

gulp.task('plugin-scripts', function() {
  return gulp.src('js/plugins/*.js')
	.pipe(concat('plugins.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js/'));
});

gulp.task('platform-scripts',function() {
  return gulp.src('js/*.js')
  .pipe(concat('application.js'))
  .pipe(header(banner, { pkg : pkg, config: config } ))
  .pipe(gulp.dest('assets/js'))
	.pipe(browserSync.stream());
});

gulp.task('scripts',function(callback){
	runSequence('plugin-scripts', 'platform-scripts',
		callback);
});

/*===========================*/
/* Fonts Compile 					   */
/*===========================*/

gulp.task('compileIcons', function(){
  gulp.src(['icons/*.svg'])
    .pipe(iconfont({
      fontName: '1839icons',
			normalize: true,
			timestamp: runTimestamp,
			prependUnicode: true
    }))
    .on('glyphs', function(glyphs, options) {
			gulp.src('icons/_icons.scss')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: config.fontName,
          fontPath: '/assets/fonts/1839icons/',
          className: 'i'
        }))
        .pipe(gulp.dest('scss/content/'));
		})
			.pipe(gulp.dest('assets/fonts/1839icons'))
		});


gulp.task('iconfonts',function(callback){
	runSequence('compileIcons', 'sass',
		callback);
});

/*===========================*/
/* Watch Task    					   */
/*===========================*/

gulp.task('watch', ['browser-sync'], function() {

	console.log('---------------------------------');
	console.log(' Using theme path ' + themepath );
	console.log('---------------------------------');

  // if any sass files change(in this folder, [compile sass])
  gulp.watch('scss/**/*.scss', ['scss']);

  // if any js files change(in this folder, [check for errors, compress js])
  //gulp.watch('src/js/**/*.js', ['plugin-scripts']);
  gulp.watch('js/**/*.js', ['scripts']);

  // if any fonts change(in this folder, [move fonts])
	gulp.watch('icons/*.svg', ['iconfonts']);
});





















