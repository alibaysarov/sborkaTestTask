import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notifier from 'node-notifier';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sprites from 'postcss-sprites';
import assets from 'postcss-assets';
import sourcemaps from 'gulp-sourcemaps';
import cssmin from 'gulp-clean-css';
import gulpif from 'gulp-if';
import log from 'fancy-log';
import colors from 'ansi-colors';

import PATHS from '../paths';
import { PRODUCTION } from '../config';

const sass = require('gulp-dart-sass');

const PROCESSORS = [
	autoprefixer({
		cascade: true,
		add: true,
		grid: true,
		flexbox: true,
		overrideBrowserslist: [
			'> 1%',
			'ie >= 8',
			'edge >= 15',
			'ie_mob >= 10',
			'ff >= 45',
			'chrome >= 45',
			'safari >= 7',
			'opera >= 23',
			'ios >= 7',
			'android >= 4',
			'bb >= 10',
		],
	}),
	assets({
		loadPaths: [PATHS.src.imagesInline],
		cache: true,
	}),
	sprites({
		stylesheetPath: './build/assets/css/',
		spritePath: './build/assets/images/',
		retina: true,
		padding: 4,
		filterBy: image =>
			/sprites\/.*\.png$/gi.test(image.url) ? Promise.resolve() : Promise.reject(),
	}),
];

export default function styles() {
	return gulp
		.src(PATHS.src.styles)
		.pipe(
			plumber({
				errorHandler: function(err) {
					log.error(colors.red(err.message));
					notifier.notify({
						title: 'SCSS compilation error',
						message: err.message,
					});
				},
			})
		)
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(
			sass({
				outputStyle: 'compressed',
			})
		)
		.pipe(postcss(PROCESSORS))
		.pipe(gulpif(PRODUCTION, cssmin({ processImport: false })))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(gulp.dest(PATHS.build.styles));
}
