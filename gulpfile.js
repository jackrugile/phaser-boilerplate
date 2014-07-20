var gulp = require( 'gulp' ),
	gulpLoadPlugins = require( 'gulp-load-plugins' ),
	p = gulpLoadPlugins();

function handleError( err ) {
	console.log( err.toString() );
	this.emit( 'end' );
}

gulp.task( 'clean', function() {
	return gulp.src( [ 'build/**/*' ], { 
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
		.pipe( gulp.dest( 'build' ) )
		.pipe( p.notify( 'HTML Task Complete' ) );
});

gulp.task( 'scss', function() {
	return gulp.src( 'src/scss/imports.scss' )
		.pipe( p.rubySass( { style: 'compressed', } ) )
		.on( 'error', handleError )
		.pipe( p.autoprefixer() )
		.pipe( p.rename( 'main.min.css' ) )
		.pipe( gulp.dest( 'build/css' ) )
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

gulp.task( 'jsconcat', function() {
	return gulp.src( [ 'src/js/lib/phaser.min.js', 'src/js/imports.min.js' ] )
		.pipe( p.concat( 'main.min.js') )
		.pipe( gulp.dest( 'build/js' ) )
		.pipe( p.notify( 'JS Task Complete' ) );
});

gulp.task( 'js', [ 'jsmin' ], function() {
	gulp.start( 'jsconcat' );
});

gulp.task('images', function() {
	return gulp.src( 'src/images/**/*' )
		.pipe( p.cache( p.imagemin({ 
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest( 'build/images' ) )
		.pipe( p.notify( 'Images Task Complete' ) );
});

gulp.task('default', [ 'clean' ], function() {
	gulp.start( 'html', 'scss', 'js', 'images', 'watch' );
});

gulp.task( 'watch', function() {
	gulp.watch( 'src/*.html', [ 'html' ] );
	gulp.watch( 'src/scss/**/*.scss', [ 'scss' ] );
	gulp.watch( ['src/js/**/*.js', '!src/js/**/*.min.js'], [ 'js' ] );
	gulp.watch( 'src/images/**/*', [ 'images' ] );
});