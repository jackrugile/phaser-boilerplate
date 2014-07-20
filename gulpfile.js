var gulp = require( 'gulp' ),
	gulpLoadPlugins = require( 'gulp-load-plugins' ),
	p = gulpLoadPlugins(),
	dest = 'build/';

function handleError( err ) {
	console.log( err.toString() );
	this.emit( 'end' );
}

gulp.task( 'clean', function() {
	return gulp.src( [ dest + '**/*' ], { 
			read: false
		})
		.pipe( p.clean() )
		.pipe( p.notify( 'Clean Task Complete' ) );
});

gulp.task( 'html', function() {
	return gulp.src( 'src/index.html' )
		.pipe( p.htmlmin( {
			removeComments: true,
			collapseWhitespace: true,
			conservativeCollapse: false
		}))
		.pipe( gulp.dest( dest ) )
		.pipe( p.notify( 'HTML Task Complete' ) );
});

gulp.task( 'scss', function() {
	return gulp.src( 'src/scss/imports.scss' )
		.pipe( p.rubySass( { style: 'compressed', } ) )
		.on( 'error', handleError )
		.pipe( p.autoprefixer() )
		.pipe( p.rename( 'main.min.css' ) )
		.pipe( gulp.dest( dest + 'css' ) )
		.pipe( p.notify( 'SCSS Task Complete' ) );
});

gulp.task( 'jsmin', function() {
	return gulp.src( 'src/js/imports.js' )
		.pipe( p.imports() )
		.pipe( p.jshint() )
		.pipe( p.jshint.reporter('default') )
		.pipe( p.uglify() )
		.on( 'error', handleError )
		.pipe( p.rename( 'imports.min.js' ) )
		.pipe( gulp.dest( 'src/js' ) );
		
});

gulp.task( 'jsconcat', [ 'jsmin' ],  function() {
	return gulp.src( [ 'src/js/lib/phaser.min.js', 'src/js/imports.min.js' ] )
		.pipe( p.concat( 'main.min.js') )
		.pipe( gulp.dest( dest + 'js' ) );
});

gulp.task( 'jsclean', [ 'jsconcat' ],  function() {
	return gulp.src( [ 'src/js/imports.min.js' ] )
		.pipe( p.clean() )
		.pipe( p.notify( 'JS Task Complete' ) );
});

gulp.task( 'js', function() {
	gulp.start( 'jsclean' );
});

gulp.task('images', function() {
	return gulp.src( 'src/images/**/*' )
		.pipe( p.cache( p.imagemin({ 
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest( dest + 'images' ) )
		.pipe( p.notify( 'Images Task Complete' ) );
});

gulp.task( 'fonts', function() {
	return gulp.src( 'src/fonts/**/*' )
		.pipe( gulp.dest( dest + 'fonts' ) )
		.pipe( p.notify( 'Fonts Task Complete' ) );
});

gulp.task( 'audio', function() {
	return gulp.src( 'src/audio/**/*' )
		.pipe( gulp.dest( dest + 'audio' ) )
		.pipe( p.notify( 'Audio Task Complete' ) );
});

gulp.task('default', [ 'clean' ], function() {
	gulp.start( 'html', 'scss', 'js', 'images', 'fonts', 'audio', 'watch' );
});

gulp.task( 'watch', function() {
	gulp.watch( 'src/*.html', [ 'html' ] );
	gulp.watch( 'src/scss/**/*.scss', [ 'scss' ] );
	gulp.watch( ['src/js/**/*.js', '!src/js/**/*.min.js'], [ 'js' ] );
	gulp.watch( 'src/images/**/*', [ 'images' ] );
	gulp.watch( 'src/fonts/**/*', [ 'fonts' ] );
	gulp.watch( 'src/audio/**/*', [ 'audio' ] );
});