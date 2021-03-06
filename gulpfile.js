/* constiables */
const { src, dest, watch, series, parallel } = require('gulp');
//related css
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob-use-forward');
const cleanCSS = require('gulp-clean-css');

//related images
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminJpg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');
const imageminGif = require('imagemin-gifsicle');
const svgmin = require('gulp-svgmin');

//related js
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//related server
const browserSync = require('browser-sync');

const srcDir = {
	default: './src/assets',
};

const destDir = {
	default: './dest',
	css: './dest/css',
};
/* Functions */
// Sass
sass.compiler = require('sass');
const compileSass = (done) => {
	src(`${srcDir.default}/sass/**/*.scss`)
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'expanded',
			})
		)
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./'))
		.pipe(dest(`${destDir.css}`));
	done();
};

const compressCss = (done) => {
	src(`${destDir.css}/style.css`)
		.pipe(plumber())
		.pipe(cleanCSS())
		.pipe(rename('style.min.css'))
		.pipe(dest(`${destDir.css}`));
	done();
};

const imageMin = (done) => {
	// jpeg,png,gif
	src(`${srcDir.default}/images/**.+(jpg|jpeg|png|gif)`)
		.pipe(changed(`${destDir.default}/images`))
		.pipe(
			imagemin([
				imageminPng(),
				imageminJpg(),
				imageminGif({
					interlaced: false,
					optimizationLevel: 3,
					colors: 180,
				}),
			])
		)
		.pipe(dest(`${destDir.default}/images`));
	done();
	// svg
	src(`${srcDir.default}/images/*.+(svg)`)
		.pipe(changed(`${destDir.default}/images`))
		.pipe(svgmin())
		.pipe(dest(`${destDir.default}/images`));
	done();
};

// concat js file(s)
const concatJs = (done) => {
	src(`${srcDir.default}/js/**.js`)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(concat('bundle.js'))
		.pipe(dest(`${destDir.default}/js`));
	done();
};

// compress js file(s)
const compressJs = (done) => {
	src(`${destDir.default}/js/bundle.js`)
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename('bundle.min.js'))
		.pipe(dest(`${destDir.default}/js`));
	done();
};

// Browser Sync
const browserSyncFunc = (done) => {
	browserSync.init({
		server: {
			baseDir: `${destDir.default}/`,
			index: 'index.html',
		},
	});
	// WordPress???????????????????????????????????????
	// browserSync.init({
	// 	files: ["./**"],
	// 	port : 80,
	// 	proxy : "localhost:8888",  // ??????
	// 	notify: false,
	// 	open: "external",
	// });
	done();
};

// Reload Browser
const reloadBrowser = (done) => {
	browserSync.reload();
	done();
};

//
// Default task
//
const watchFiles = (done) => {
	watch(`${destDir.default}/**/*.html`, reloadBrowser);
	watch(
		`${srcDir.default}/sass/**/*.scss`,
		series(compileSass, compressCss, reloadBrowser)
	);
	watch(
		`${srcDir.default}/js/*.js`,
		series(concatJs, compressJs, reloadBrowser)
	);
	watch(`${srcDir.default}/images/*`, series(imageMin, reloadBrowser));
	done();
};

exports.default = parallel(
	compileSass,
	concatJs,
	imageMin,
	watchFiles,
	browserSyncFunc
);

exports.minify = parallel(compressCss , compressJs);
